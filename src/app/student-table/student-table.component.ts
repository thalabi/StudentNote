import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
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
    private router: Router) {

    console.log('StudentTableComponent constructor ...');
  }

  ngOnInit () {
    console.log('StudentTableComponent ngOnInit() begin ...');
    this.studentArray = this.studentService.getStudents()
    console.log('length: ' + this.studentArray.length);
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
    this.router.navigate(['/studentDetails', '', 'Add']);
  }
  onModifyStudent() {
    this.router.navigate(['/studentDetails', this.studentArray[this.selectedRowIndex].id, 'Modify']);
  }
  onDeleteStudent() {
    this.router.navigate(['/studentDetails', this.studentArray[this.selectedRowIndex].id, 'Delete']);
  }
  onManageNotes() {
    this.router.navigate(['/noteTable', this.studentArray[this.selectedRowIndex].id]);    
  }
}
