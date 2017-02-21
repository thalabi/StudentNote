import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Note } from './Note';

import { Http, Headers} from '@angular/http';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/concat';
// Observale operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Constants } from './constants';

import { SessionDataService } from './session-data.service';

@Injectable()
export class StudentService {

  private httpHeaders = new Headers({
    'X-AUTH-TOKEN': this.sessionDataService.user.token,
    'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private sessionDataService: SessionDataService) { }

  getStudents(): Observable<Student[]> {

    console.log('in getStudents()');
    return this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getAllStudents", {headers: this.httpHeaders})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }
  

  saveStudent(student: Student): Observable<Student> {

    console.log('in saveStudent, student: ', student);
    return this.http
      .post(Constants.STUDENT_NOTES_SERVICE_URL+"/saveStudent", JSON.stringify(student), {headers: this.httpHeaders})
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  deleteStudent(student: Student) {

    return this.http
      .delete(Constants.STUDENT_NOTES_SERVICE_URL+"/deleteStudentById/"+student.id, {headers: this.httpHeaders})
      .catch(this.handleError);
  }

  saveNote (student: Student): Observable<Student> {

    let saveStudentObservable$: Observable<Student> =
      this.http.post(Constants.STUDENT_NOTES_SERVICE_URL+"/saveStudent", JSON.stringify(student), {headers: this.httpHeaders})
      //.map(response => response.json() as Student)
      .catch(this.handleError);

    let getStudentByIdObservable$: Observable<Student> =
      this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getStudentById/"+student.id, {headers: this.httpHeaders})
      .map(response => response.json() as Student)
      .catch(this.handleError);

    return Observable.concat(saveStudentObservable$, getStudentByIdObservable$);
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

  getLatestActiveStudents(): Observable<Student[]> {

    console.log('in getLatestActiveStudents()');
    return this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getLatestActiveStudents/5", {headers: this.httpHeaders})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }  
}
