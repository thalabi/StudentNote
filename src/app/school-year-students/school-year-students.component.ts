import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { Student } from '../domain/Student';
import { UserPreference } from '../domain/UserPreference';
import { SessionDataService } from '../session-data.service';
import { StudentService } from '../student.service';
import { MessageService } from './../error/message.service';
import { SaveRemoveStudentsToFromSchoolYearVO } from '../vo/SaveRemoveStudentsToFromSchoolYearVO';

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
  schoolYearId: number;

  constructor(
    private sessionDataService: SessionDataService,
    private studentService: StudentService,
    private messageService: MessageService    
  ) { }

  ngOnInit() {
    this.userPreference = this.sessionDataService.userPreference;
    this.schoolYearId = this.userPreference.schoolYear.id;
//
    this.studentService.getStudentDtosNotInSchoolYear(this.schoolYearId).subscribe({
      next: students => {
        this.availableStudents = students;
        console.log('allStudents[]: ', this.availableStudents);
      },
      error: error => {
        console.error(error);
        this.messageService.clear();
        this.messageService.error(error);
      }});

    this.studentService.getStudentDtosInSchoolYear(this.schoolYearId).subscribe({
      next: students => {
        this.schoolYearStudents = students;
        this.oldSchoolYearStudents = students.slice(0); // copies array
        console.log('schoolYearStudents[]: ', this.schoolYearStudents);
      },
      error: error => {
        console.error(error);
        this.messageService.clear();
        this.messageService.error(error);
      }});

  }

  onSubmit(){
    let oldStudentIds: number[] = [];
    for (let student of this.oldSchoolYearStudents) {
      oldStudentIds.push(student.id);
    }
    let studentIds: number[] = [];
    for (let student of this.schoolYearStudents) {
      studentIds.push(student.id);
    }
    console.log('oldStudentIds', oldStudentIds);
    console.log('studentIds', studentIds);
    console.log('this.schoolYearId', this.schoolYearId);

    let saveRemoveStudentsToFromSchoolYearVO: SaveRemoveStudentsToFromSchoolYearVO = new SaveRemoveStudentsToFromSchoolYearVO();
    saveRemoveStudentsToFromSchoolYearVO.schoolYearId = this.schoolYearId;
    saveRemoveStudentsToFromSchoolYearVO.oldSchoolYearStudents = this.oldSchoolYearStudents;
    saveRemoveStudentsToFromSchoolYearVO.newSchoolYearStudents = this.schoolYearStudents;

    this.studentService.saveRemoveStudentsToFromSchoolYear(saveRemoveStudentsToFromSchoolYearVO).subscribe({
      // next: students => {
      //   this.schoolYearStudents = students;
      //   this.oldSchoolYearStudents = students.slice(0); // copies array
      //   console.log('schoolYearStudents[]: ', this.schoolYearStudents);
      // },
      error: error => {
        console.error(error);
        this.messageService.clear();
        this.messageService.error(error);
      }});

  }
  onCancel(){

  }
}
