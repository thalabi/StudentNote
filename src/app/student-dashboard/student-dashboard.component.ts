import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { MessageService } from './../error/message.service';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  studentArray: Student[];

  public selectedRowIndex : number;

  constructor(
    private studentService: StudentService,
    private sessionDataService: SessionDataService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.studentService.getLatestActiveStudents()
      .subscribe({
          next: students => {
            this.studentArray = students;
            console.log('studentArray[]: ', this.studentArray);
          },
          error: error => {
            console.error(error);
            this.messageService.clear();
            this.messageService.error(error);
          }
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
