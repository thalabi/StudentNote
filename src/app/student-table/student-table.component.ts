import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  studentArray: Student[];

  selectedRowIndex : number;
  modifyAndDeleteButtonsDisable : boolean = true;

  constructor (
    private studentService: StudentService,
    private sessionDataService: SessionDataService,
    private router: Router) {

    console.log('StudentTableComponent constructor ...');
  }

  ngOnInit () {
    console.log('StudentTableComponent ngOnInit() begin ...');
    // let millisecondsToWait = 2000;
    // setTimeout(function() {
    //   console.log('Waiting 2000 milli seconds ...');
    // }, millisecondsToWait);
    this.studentService.getStudents().subscribe(
      students => {
        this.studentArray = students;
        console.log('studentArray[]: ', this.studentArray);
      });
    console.log('StudentTableComponent ngOnInit() end ...');
  }

  rowOnClick (selectedRowIndex: number) {
    //console.log('StudentTableComponent begin ...');
    //console.log('this.studentArray[selectedRowIndex].firstName: '+this.studentArray[selectedRowIndex].firstName);
    //this.router.navigate(['/studentDetails', student.id]);
    if (selectedRowIndex != this.selectedRowIndex) {
      this.selectedRowIndex = selectedRowIndex;
      this.modifyAndDeleteButtonsDisable = false;
    } else {
      this.selectedRowIndex = -1;
      this.modifyAndDeleteButtonsDisable = true;
    }
    
    //console.log('StudentTableComponent end ...');
  }

  onAddStudent() {
    this.sessionDataService.student = this.studentArray[this.selectedRowIndex];
    this.sessionDataService.crudMode = 'Add';
    this.router.navigate(['/studentDetailsForm']);
  }
  onModifyStudent() {
    this.sessionDataService.student = this.studentArray[this.selectedRowIndex];
    this.sessionDataService.crudMode = 'Modify';
    this.router.navigate(['/studentDetailsForm']);
  }
  onDeleteStudent() {
    this.sessionDataService.student = this.studentArray[this.selectedRowIndex];
    this.sessionDataService.crudMode = 'Delete';
    this.router.navigate(['/studentDetailsForm']);
  }
  onManageNotes() {
    this.sessionDataService.student = this.studentArray[this.selectedRowIndex];
    this.router.navigate(['/noteTable']);    
  }
}
