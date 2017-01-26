import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Note } from './Note';

import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class StudentService {

  private studentNotesServiceUrl = 'http://localhost:8080/StudentNotesService';  // URL to web api
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});

  private studentArray: Student[] = [
      {id: 1, firstName: 'Tarif', lastName: 'Halabi', grade: '1', version: 0, noteList: [
        {id: 1, timestamp: new Date(2016, 11, 31, 17, 1), text: "Note 1", version: 0}
      ]},
      {id: 2, firstName: 'May', lastName: 'Halabi', grade: '2', version: 0, noteList: [
        {id: 2, timestamp: new Date(2016, 11, 31, 17, 2), text: "Note 2", version: 0},
        {id: 3, timestamp: new Date(2016, 11, 31, 17, 3), text: "Note 3", version: 0}
      ]},
      {id: 3, firstName: 'Layla', lastName: 'Halabi', grade: '3', version: 0, noteList: [
        {id: 4, timestamp: new Date(2016, 11, 31, 17, 4), text: "Note 4", version: 0},
        {id: 5, timestamp: new Date(2016, 11, 31, 17, 5), text: "Note 5", version: 0},
        {id: 6, timestamp: new Date(2016, 11, 31, 17, 6), text: "Note 6", version: 0}
      ]},
      {id: 4, firstName: 'Kareem', lastName: 'Halabi', grade: '4', version: 0, noteList: [
        {id: 7, timestamp: new Date(2016, 11, 31, 17, 7), text: "Note 7", version: 0},
        {id: 8, timestamp: new Date(2016, 11, 31, 17, 8), text: "Note 8", version: 0},
        {id: 9, timestamp: new Date(2016, 11, 31, 17, 9), text: "Note 9", version: 0},
        {id: 10, timestamp: new Date(2016, 11, 31, 17, 10), text: "Note 10", version: 0}
      ]}
    ];
  private studentIdSequence: number = 4;
  private noteIdSequence: number = 10;

  constructor(
    private http: Http) { }

  // getStudents(): Student[] {

  //   return this.studentArray;
  // }
  getStudents(): Observable<Student[]> {

    console.log('in getStudents()');
    return this.http.get(this.studentNotesServiceUrl+"/getAllStudents")
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }
  
  getStudentById(id: number ): Student {

    for (let i=0; i<this.studentArray.length; i++){
      if (this.studentArray[i].id == id) {
        return this.studentArray[i];
      }
    }
  }

  // saveStudent(student: Student) {

  //   for (let i=0; i<this.studentArray.length; i++){
  //     if (this.studentArray[i].id == student.id) {
  //       this.studentArray[i] = student;
  //       return;
  //     }
  //   }
  //   // add the student to the array
  //   student.id = ++this.studentIdSequence;
  //   console.log("StudentService saveStudent(), student.id: " + student.id);
  //   this.studentArray[this.studentArray.length] = student;
  // }

  saveStudent(student: Student): Observable<Student> {

    console.log('in saveStudent, student: ', student);
    return this.http
      .post(this.studentNotesServiceUrl+"/saveStudent", JSON.stringify(student), {headers: this.jsonHeaders})
      .map(response => response.json() as Student)
      .catch(this.handleError);
    // console.log('after call to http.post');

    // for (let i=0; i<this.studentArray.length; i++){
    //   if (this.studentArray[i].id == student.id) {
    //     this. studentArray[i] = student;
    //     return;
    //   }
    // }
    // add the student to the array
    // student.id = ++this.studentIdSequence;
    // console.log("StudentService saveStudent(), student.id: " + student.id);
    // this.studentArray[this.studentArray.length] = student;
  }

  // deleteStudent(student: Student) {

  //   for (let i=0; i<this.studentArray.length; i++){
  //     if (this.studentArray[i].id == student.id) {
  //       console.log("deleteStudent(), i: " + i + ", this.studentArray.length: " + this.studentArray.length);
  //       this.studentArray.splice(i, 1);
  //       console.log("deleteStudent(), after splice, this.studentArray.length: " + this.studentArray.length);
  //       return;
  //     }
  //   }
  //   console.error("element not found");
  // }
  deleteStudent(student: Student) {

    console.log('in deleteStudent, student: ', student);
    return this.http
      .delete(this.studentNotesServiceUrl+"/deleteStudentById/"+student.id, {headers: this.jsonHeaders})
      .catch(this.handleError);
  }
/*
  getNoteById(studentId: number, noteId: number ): Note {

    let student: Student;
    let note: Note;

    for (let i=0; i<this.studentArray.length; i++){
      if (this.studentArray[i].id == studentId) {
         student = this.studentArray[i];
      }
    }

    for (let i=0; i<student.noteSet.length; i++){
      if (student.noteSet[i].id == noteId) {
         note = student.noteSet[i];
      }
    }

    return note;
  }
*/
  saveNote (student: Student, note: Note) {

    for (let i=0; i<student.noteList.length; i++){
      if (student.noteList[i].id == note.id) {
        student.noteList[i] = note;
        return;
      }
    }
    // add the student to the array
    note.id = ++this.noteIdSequence;
    console.log("StudentService saveNote(), note.id: " + note.id);
    student.noteList[student.noteList.length] = note;
  }

  deleteNote(student: Student, note: Note) {

    for (let i=0; i<student.noteList.length; i++){
      if (student.noteList[i].id == note.id) {
        console.log("deleteStudent(), i: " + i + ", this.studentArray.length: " + student.noteList.length);
        student.noteList.splice(i, 1);
        console.log("deleteStudent(), after splice, this.studentArray.length: " + student.noteList.length);
        return;
      }
    }
    console.error("element not found");
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }  
}
