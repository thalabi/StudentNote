import { Injectable } from '@angular/core';
import { Student } from './Student';

@Injectable()
export class StudentService {

  private studentArray: Student[] = [
      {id: 1, firstName: 'Tarif', lastName: 'Halabi', grade: '1'},
      {id: 2, firstName: 'May', lastName: 'Halabi', grade: '2'},
      {id: 3, firstName: 'Layla', lastName: 'Halabi', grade: '3'},
      {id: 4, firstName: 'Kareem', lastName: 'Halabi', grade: '4'}
    ];
  private sequence: number = 4;

  constructor() { }

  getStudents(): Student[] {

    return this.studentArray;
  }
  getStudentById(id: number ): Student {

    for (let i=0; i<this.studentArray.length; i++){
      if (this.studentArray[i].id == id) {
        return this.studentArray[i];
      }
    }
  }
  saveStudent(student: Student) {

    for (let i=0; i<this.studentArray.length; i++){
      if (this.studentArray[i].id == student.id) {
        this.studentArray[i] = student;
        return;
      }
    }
    // add the student to the array
    student.id = ++this.sequence;
    console.log("StudentService saveStudent(), student.id: " + student.id);
    this.studentArray[this.studentArray.length] = student;
  }

  deleteStudent(student: Student) {

    for (let i=0; i<this.studentArray.length; i++){
      if (this.studentArray[i].id == student.id) {
        console.log("deleteStudent(), i: " + i + ", this.studentArray.length: " + this.studentArray.length);
        this.studentArray.splice(i, 1);
        console.log("deleteStudent(), after splice, this.studentArray.length: " + this.studentArray.length);
        return;
      }
    }
    console.error("element not found");
  }
}
