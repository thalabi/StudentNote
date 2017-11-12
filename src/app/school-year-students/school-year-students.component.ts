import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { Student } from '../domain/Student';
import { UserPreference } from '../domain/UserPreference';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { MessageService } from './../error/message.service';
import { StudentService } from '../student.service';
import { SaveRemoveStudentsToFromSchoolYearVo } from 'app/vo/SaveRemoveStudentsToFromSchoolYearVo';

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
    private studentService: StudentService,
    private sessionDataService: SessionDataService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.clear();
    this.userPreference = this.sessionDataService.userPreference;
    this.schoolYearId = this.userPreference.schoolYear.id;
//
    this.studentService.getStudentsNotInSchoolYear(this.schoolYearId).subscribe({
      next: students => {
        this.availableStudents = students;
        console.log('allStudents[]: ', this.availableStudents);
      },
      error: error => {
        console.error(error);
        this.messageService.error(error);
      }});

    this.studentService.getStudentsInSchoolYear(this.schoolYearId).subscribe({
      next: students => {
        this.schoolYearStudents = students;
        this.oldSchoolYearStudents = students.slice(0); // copies array
        console.log('schoolYearStudents[]: ', this.schoolYearStudents);
      },
      error: error => {
        console.error(error);
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

    // let saveRemoveStudentsToFromSchoolYearVO: SaveRemoveStudentsToFromSchoolYearVO = new SaveRemoveStudentsToFromSchoolYearVO();
    // saveRemoveStudentsToFromSchoolYearVO.schoolYearId = this.schoolYearId;
    // saveRemoveStudentsToFromSchoolYearVO.oldSchoolYearStudents = this.oldSchoolYearStudents;
    // saveRemoveStudentsToFromSchoolYearVO.newSchoolYearStudents = this.schoolYearStudents;

    let saveRemoveStudentsToFromSchoolYearVO2: SaveRemoveStudentsToFromSchoolYearVo = new SaveRemoveStudentsToFromSchoolYearVo();
    saveRemoveStudentsToFromSchoolYearVO2.schoolYearId = this.schoolYearId;
    saveRemoveStudentsToFromSchoolYearVO2.oldSchoolYearStudentIds = oldStudentIds;
    saveRemoveStudentsToFromSchoolYearVO2.newSchoolYearStudentIds = studentIds;

    //this.studentService.saveRemoveStudentsToFromSchoolYear(saveRemoveStudentsToFromSchoolYearVO).subscribe({
    this.studentService.saveRemoveStudentsToFromSchoolYear2(saveRemoveStudentsToFromSchoolYearVO2).subscribe({
      // next: students => {
      //   this.schoolYearStudents = students;
      //   this.oldSchoolYearStudents = students.slice(0); // copies array
      //   console.log('schoolYearStudents[]: ', this.schoolYearStudents);
      // },
      error: error => {
        console.error(error);
        this.messageService.error(error);
      },
      complete: () => {
        //this.loadSchoolYears();
        this.router.navigate(['studentTable']);
      }
    });

  }
  onCancel(){

  }

  onMoveToSource(){
    this.sortStudents(this.availableStudents);
  }

  onMoveAllToSource(){
    this.onMoveToSource();
  }

  
  onMoveToTarget(){
    this.sortStudents(this.schoolYearStudents);
  }

  onMoveAllToTarget(){
    this.onMoveToTarget();
  }

  sortStudents(students: Student[]): void {
    students.sort((leftSide, rightSide): number => {
      if (leftSide.firstName < rightSide.firstName) return -1;
      if (leftSide.firstName > rightSide.firstName) return 1;
      if (leftSide.lastName < rightSide.lastName) return -1;
      if (leftSide.lastName > rightSide.lastName) return 1;
      return 0;
    });
  }
}
