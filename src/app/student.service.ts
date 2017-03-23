import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Note } from './Note';

import { Http, Headers, Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/concat';
// Observale operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Constants } from './constants';

import { SessionDataService } from './session-data.service';
import { TimestampRange } from './TimestampRange';

@Injectable()
export class StudentService {

  // private httpHeaders = new Headers({
  //   'X-AUTH-TOKEN': this.sessionDataService.user.token,
  //   'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private sessionDataService: SessionDataService) { }

  httpHeaders(): Headers {
    return new Headers({
      'Authorization': 'Bearer ' + this.sessionDataService.user.token,
      'Content-Type': 'application/json'});
  }

  getStudents(): Observable<Student[]> {

    console.log('in getStudents()');
    console.log('this.httpHeaders(): ', this.httpHeaders());
    console.log('this.sessionDataService.user.token: ', this.sessionDataService.user.token);
    return this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getAllStudents", {headers: this.httpHeaders()})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }
  
  getAllStudentsWithoutNotesList(): Observable<Student[]> {

    return this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getAllStudentsWithoutNotesList", {headers: this.httpHeaders()})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }

  saveStudent(student: Student): Observable<Student> {

    console.log('in saveStudent, student: ', student);
    return this.http
      .post(Constants.STUDENT_NOTES_SERVICE_URL+"/saveStudent", JSON.stringify(student), {headers: this.httpHeaders()})
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  deleteStudent(student: Student) {

    return this.http
      .delete(Constants.STUDENT_NOTES_SERVICE_URL+"/deleteStudentById/"+student.id, {headers: this.httpHeaders()})
      .catch(this.handleError);
  }

  saveNote (student: Student): Observable<Student> {

    let saveStudentObservable$: Observable<Student> =
      this.http.post(Constants.STUDENT_NOTES_SERVICE_URL+"/saveStudent", JSON.stringify(student), {headers: this.httpHeaders()})
      //.map(response => response.json() as Student)
      .catch(this.handleError);

    let getStudentByIdObservable$: Observable<Student> =
      this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getStudentById/"+student.id, {headers: this.httpHeaders()})
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
    return this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/getLatestActiveStudents/5", {headers: this.httpHeaders()})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }

  downloadAllPdf(): any {
    return this.http.get('http://localhost:8080/StudentNotesService/pdfAll', {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  downloadStudentsByTimestampRangePdf(timestampRange: TimestampRange): any {
    return this.http.post('http://localhost:8080/StudentNotesService/pdfStudentsByTimestampRange', JSON.stringify(timestampRange), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  downloadStudentsByStudentIdsPdf(studentIds: number[]): any {
    return this.http.post('http://localhost:8080/StudentNotesService/pdfStudentsByStudentIds', JSON.stringify(studentIds), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  private handleErrorXXXXXXXXXXXX(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }  

  private handleError (response: Response | any) {
      console.log(response);
      let errorMessage: string;
      if (response instanceof Response) {
          const bodyJson = response.json() || '';
          const serverErrorMessage = bodyJson.errorMessage || JSON.stringify(bodyJson);
          console.error(serverErrorMessage);
          errorMessage = `HTTP: ${response.status} - ${response.statusText || ''}. Server error message: ${serverErrorMessage}`;
      } else {
          errorMessage = response.message ? response.message : response.toString();
      }
      return Observable.throw(errorMessage);
  }

}
