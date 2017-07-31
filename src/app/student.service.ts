import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Note } from './Note';
import { SchoolYear } from './SchoolYear';

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
import { ConfigService } from './config/config.service';
import { ApplicationProperties } from './config/application.properties';

@Injectable()
export class StudentService {

  private serviceUrl: string;
  private activeStudentsLimit: number;

  constructor(
    private http: Http,
    private sessionDataService: SessionDataService,
    private configService: ConfigService
  ) {
    const applicationProperties: ApplicationProperties = this.configService.getApplicationProperties();
    this.serviceUrl = applicationProperties.serviceUrl;
    this.activeStudentsLimit = applicationProperties.activeStudentsLimit;
    console.log(this.serviceUrl);
    console.log(this.activeStudentsLimit);
  }

  private httpHeaders(): Headers {
    return new Headers({
      'Authorization': 'Bearer ' + this.sessionDataService.user.token,
      'Content-Type': 'application/json'});
  }

  getStudents(): Observable<Student[]> {

    console.log('in getStudents()');
    console.log('this.httpHeaders(): ', this.httpHeaders());
    console.log('this.sessionDataService.user.token: ', this.sessionDataService.user.token);

    let username: string = this.sessionDataService.user.username;
    return this.http.get(this.serviceUrl+"/getStudentsBySchoolYearFromUserPreference/" + username, {headers: this.httpHeaders()})
              .map(response => {
                let schoolYear = response.json() as SchoolYear;
                return schoolYear.studentSet;
              })
              .catch(this.handleError);    


    // return this.http.get(this.serviceUrl+"/schoolYear/getStudentsBySchoolYearId/1", {headers: this.httpHeaders()})
    //           .map(response => {
    //             let schoolYear = response.json() as SchoolYear;
    //             return schoolYear.studentSet;
    //           })
    //           .catch(this.handleError);    

    // return this.http.get(this.serviceUrl+"/getAllStudents", {headers: this.httpHeaders()})
    //           .map(response => response.json() as Student[])
    //           .catch(this.handleError);
  }
  
  getAllStudentsWithoutNotesList(): Observable<Student[]> {

    return this.http.get(this.serviceUrl+"/getAllStudentsWithoutNotesList", {headers: this.httpHeaders()})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }

  saveStudent(student: Student): Observable<Student> {

    console.log('in saveStudent, student: ', student);
    return this.http
      .post(this.serviceUrl+"/saveStudent", JSON.stringify(student), {headers: this.httpHeaders()})
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  deleteStudent(student: Student) {

    return this.http
      .delete(this.serviceUrl+"/deleteStudentById/"+student.id, {headers: this.httpHeaders()})
      .catch(this.handleError);
  }

  saveNote (student: Student): Observable<Student> {

    let saveStudentObservable$: Observable<Student> =
      this.http.post(this.serviceUrl+"/saveStudent", JSON.stringify(student), {headers: this.httpHeaders()})
      //.map(response => response.json() as Student)
      .catch(this.handleError);

    let getStudentByIdObservable$: Observable<Student> =
      this.http.get(this.serviceUrl+"/getStudentById/"+student.id, {headers: this.httpHeaders()})
      .map(response => response.json() as Student)
      .catch(this.handleError);

    return Observable.concat(saveStudentObservable$, getStudentByIdObservable$);
  }

  getLatestActiveStudents(): Observable<Student[]> {

    console.log('in getLatestActiveStudents()');
    let username: string = this.sessionDataService.user.username;
    return this.http.get(this.serviceUrl+"/getLatestActiveStudents/"+username+"/"+this.activeStudentsLimit, {headers: this.httpHeaders()})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }

  downloadAllPdf(): any {
    return this.http.get(this.serviceUrl+'/pdfAll', {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  downloadStudentsByTimestampRangePdf(timestampRange: TimestampRange): any {
    return this.http.post(this.serviceUrl+'/pdfStudentsByTimestampRange', JSON.stringify(timestampRange), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  downloadStudentsByStudentIdsPdf(studentIds: number[]): any {
    return this.http.post(this.serviceUrl+'/pdfStudentsByStudentIds', JSON.stringify(studentIds), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  getVersion(): Observable<string> {

    return this.http.get(this.serviceUrl+"/getVersion")
              .map(response => response.text())
              .catch(this.handleError);
  }

  private handleError (response: Response | any) {
      console.log(response);
      let errorMessage: string;
      if (response instanceof Response) {
        let serverErrorMessage: string;
        try {
          const bodyJson = response.json();
          serverErrorMessage = bodyJson.errorMessage || JSON.stringify(bodyJson);
        } catch (error) {
          serverErrorMessage = response.text();
        } 
        console.error(serverErrorMessage);
         errorMessage = `HTTP: ${response.status} - ${response.statusText || ''}. Server error message: ${serverErrorMessage}`;
      } else {
          errorMessage = response.message ? response.message : response.toString();
      }
      return Observable.throw(errorMessage);
  }
}
