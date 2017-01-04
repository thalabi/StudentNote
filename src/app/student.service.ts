import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Note } from './Note';

@Injectable()
export class StudentService {

  private studentArray: Student[] = [
      {id: 1, firstName: 'Tarif', lastName: 'Halabi', grade: '1', noteSet: [
        {id: 1, timestamp: new Date(2016, 11, 31, 17, 1), text: "Note 1"}
      ]},
      {id: 2, firstName: 'May', lastName: 'Halabi', grade: '2', noteSet: [
        {id: 2, timestamp: new Date(2016, 11, 31, 17, 2), text: "Note 2"},
        {id: 3, timestamp: new Date(2016, 11, 31, 17, 3), text: "Note 3"}
      ]},
      {id: 3, firstName: 'Layla', lastName: 'Halabi', grade: '3', noteSet: [
        {id: 4, timestamp: new Date(2016, 11, 31, 17, 4), text: "Note 4"},
        {id: 5, timestamp: new Date(2016, 11, 31, 17, 5), text: "Note 5"},
        {id: 6, timestamp: new Date(2016, 11, 31, 17, 6), text: "Note 6"}
      ]},
      {id: 4, firstName: 'Kareem', lastName: 'Halabi', grade: '4', noteSet: [
        {id: 7, timestamp: new Date(2016, 11, 31, 17, 7), text: "Note 7"},
        {id: 8, timestamp: new Date(2016, 11, 31, 17, 8), text: "Note 8"},
        {id: 9, timestamp: new Date(2016, 11, 31, 17, 9), text: "Note 9"},
        {id: 10, timestamp: new Date(2016, 11, 31, 17, 10), text: "Note 10"}
      ]}
    ];
  private studentIdSequence: number = 4;
  private noteIdSequence: number = 10;

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
    student.id = ++this.studentIdSequence;
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

    for (let i=0; i<student.noteSet.length; i++){
      if (student.noteSet[i].id == note.id) {
        student.noteSet[i] = note;
        return;
      }
    }
    // add the student to the array
    note.id = ++this.noteIdSequence;
    console.log("StudentService saveNote(), note.id: " + note.id);
    student.noteSet[student.noteSet.length] = note;
  }

  deleteNote(student: Student, note: Note) {

    for (let i=0; i<student.noteSet.length; i++){
      if (student.noteSet[i].id == note.id) {
        console.log("deleteStudent(), i: " + i + ", this.studentArray.length: " + student.noteSet.length);
        student.noteSet.splice(i, 1);
        console.log("deleteStudent(), after splice, this.studentArray.length: " + student.noteSet.length);
        return;
      }
    }
    console.error("element not found");
  }
}
