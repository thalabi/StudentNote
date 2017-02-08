import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  studentArray: Student[];

  public names: string[];
  public selectedRowIndex : number;

  constructor(
    private studentService: StudentService,
    private sessionDataService: SessionDataService,
    private router: Router) { }

  ngOnInit() {
    let name1: string = 'first1 last1';
    let name2: string = 'first2 last2';
    let name3: string = 'long first3 last3';
    let name4: string = 'first4 last4';
    let name5: string = 'first5 last5';
    this.names = [name1, name2, name3, name4, name5];
    this.studentService.getLatestActiveStudents().subscribe(
      students => {
        this.studentArray = students;
        console.log('studentArray[]: ', this.studentArray);
      });
    
  }

  tileOnClick (selectedRowIndex: number) {
    console.log('begin ...');
    // if (selectedRowIndex != this.selectedRowIndex) {
    //   this.selectedRowIndex = selectedRowIndex;
    //   this.modifyAndDeleteButtonsDisable = false;
    // } else {
    //   this.selectedRowIndex = -1;
    //   this.modifyAndDeleteButtonsDisable = true;
    // }
    this.selectedRowIndex = selectedRowIndex;
    this.sessionDataService.student = this.studentArray[this.selectedRowIndex];
    this.router.navigate(['/noteTable']);    
    
    console.log('end ...');
  }

}
