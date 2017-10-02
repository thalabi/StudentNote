import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { Student } from '../domain/Student';
import { UserPreference } from '../domain/UserPreference';
import { SessionDataService } from '../session-data.service';
import { StudentService } from '../student.service';
import { MessageService } from './../error/message.service';

@Component({
  selector: 'app-school-year-students',
  templateUrl: './school-year-students.component.html',
  styleUrls: ['./school-year-students.component.css']
})
export class SchoolYearStudentsComponent implements OnInit {
  // schoolYearsSource: SchoolYear[];
  // schoolYearsTarget: SchoolYear[];
  userPreference: UserPreference;
  availableStudents: Student[];
  schoolYearStudents: Student[];
  oldSchoolYearStudents: Student[];

  constructor(
    private sessionDataService: SessionDataService,
    private studentService: StudentService,
    private messageService: MessageService    
  ) { }

  ngOnInit() {
    this.userPreference = this.sessionDataService.userPreference;
    let schoolYearId: number = this.userPreference.schoolYear.id;
//
    this.studentService.getStudentDtosNotInSchoolYear(schoolYearId).subscribe({
      next: students => {
        this.availableStudents = students;
        console.log('allStudents[]: ', this.availableStudents);
      },
      error: error => {
        console.error(error);
        this.messageService.clear();
        this.messageService.error(error);
      }});

    this.studentService.getStudentDtosInSchoolYear(schoolYearId).subscribe({
      next: students => {
        this.schoolYearStudents = students;
        this.oldSchoolYearStudents = students;
        console.log('schoolYearStudents[]: ', this.schoolYearStudents);
      },
      error: error => {
        console.error(error);
        this.messageService.clear();
        this.messageService.error(error);
      }});

  }

  onSubmit(){

  }
  onCancel(){
    
  }
}
