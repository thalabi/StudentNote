import { Injectable } from '@angular/core';
import { Student } from './domain/Student';
import { Note } from './domain/Note';
import { SchoolYear } from './domain/SchoolYear';
import { UserPreference } from './domain/UserPreference';
import { SaveRemoveStudentsToFromSchoolYearVO } from './vo/SaveRemoveStudentsToFromSchoolYearVO';

import { Http, Headers, Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/concat';
// Observale operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import { Subject } from 'rxjs/Subject';

import { Constants } from './constants';

import { SessionDataService } from './session-data.service';
import { TimestampRange } from './TimestampRange';
import { ConfigService } from './config/config.service';
import { ApplicationProperties } from './config/application.properties';
import { SaveRemoveStudentsToFromSchoolYearVO2 } from 'app/vo/SaveRemoveStudentsToFromSchoolYearVO2';
import { PrintRequestVO } from 'app/vo/PrintRequestVO';
import { NoteRequestVo } from 'app/vo/NoteRequestVO';

@Injectable()
export class StudentService {

  private serviceUrl: string;
  private activeStudentsLimit: number;
  //public userPreferenceSubject: Subject<UserPreference>;// = Subject.from([null]);

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
    // this.userPreferenceSubject = new Subject<UserPreference>();
    // this.userPreferenceSubject.next(new UserPreference());

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
    let schoolYearId: number = this.sessionDataService.userPreference.schoolYear.id;
    //return this.http.get(this.serviceUrl+"/getStudentsByUsername/" + username, {headers: this.httpHeaders()})
    return this.http.get(this.serviceUrl+"/getStudentGraphBySchoolYear/" + schoolYearId, {headers: this.httpHeaders()})
      .map(response => {
        return response.json() as Student[];
      })
      .catch(this.handleError);    

    // return this.http.get(this.serviceUrl+"/getStudentDtosBySchoolYearFromUserPreference/" + username, {headers: this.httpHeaders()})
    //           .map(response => {
    //             let schoolYear = response.json() as SchoolYear;
    //             return schoolYear.studentSet;
    //           })
    //           .catch(this.handleError);    


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

  addStudentDetails(student: Student): Observable<Student> {

    console.log('in addStudentDetails, student: ', student);
    return this.http
      .post(this.serviceUrl+"/addStudentDetails", JSON.stringify(student), {headers: this.httpHeaders()})
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  updateStudentDetails(student: Student): Observable<Student> {

    console.log('in updateStudentDetails, student: ', student);
    return this.http
      .post(this.serviceUrl+"/updateStudentDetails", JSON.stringify(student), {headers: this.httpHeaders()})
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  deleteStudent(student: Student) {

    return this.http
      .delete(this.serviceUrl+"/deleteStudentById/"+student.id, {headers: this.httpHeaders()})
      .catch(this.handleError);
  }

  updateStudentNotes(student: Student): Observable<Student> {
    
        console.log('in updateStudentNotes, student: ', student);
        return this.http
          .post(this.serviceUrl+"/updateStudentNotes", JSON.stringify(student), {headers: this.httpHeaders()})
          .map(response => response.json() as Student)
          .catch(this.handleError);
      }
    
  // saveNoteOld (student: Student): Observable<Student> {

  //   let saveStudentObservable$: Observable<Student> =
  //     this.http.post(this.serviceUrl+"/saveStudentDto", JSON.stringify(student), {headers: this.httpHeaders()})
  //     //.map(response => response.json() as Student)
  //     .catch(this.handleError);
  //   // getStudentById so that the notes are ordered chronlogically
  //   let getStudentByIdObservable$: Observable<Student> =
  //     this.http.get(this.serviceUrl+"/getStudentDtoById/"+student.id, {headers: this.httpHeaders()})
  //     .map(response => response.json() as Student)
  //     .catch(this.handleError);

  //   return Observable.concat(saveStudentObservable$, getStudentByIdObservable$);
  // }
  updateNote(noteRequestVo: NoteRequestVo): Observable<Note> {
    
        console.log('in updateNote, noteRequestVo: ', noteRequestVo);
        return this.http
          .post(this.serviceUrl+"/noteResource/updateNote", JSON.stringify(noteRequestVo), {headers: this.httpHeaders()})
          .map(response => response.json() as Note)
          .catch(this.handleError);
      }

  saveNote (student: Student): Observable<Student> {
    
      return this.http.post(this.serviceUrl+"/saveStudentUiDto", JSON.stringify(student), {headers: this.httpHeaders()})
        .map(response => response.json() as Student)
        .catch(this.handleError);
    }
      

  getLatestActiveStudents(): Observable<Student[]> {

    console.log('in getLatestActiveStudents()');
    let username: string = this.sessionDataService.user.username;
    return this.http.get(this.serviceUrl+"/getLatestActiveStudentDtos/"+username+"/"+this.activeStudentsLimit, {headers: this.httpHeaders()})
              .map(response => response.json() as Student[])
              .catch(this.handleError);
  }

  downloadAllPdf(printRequestVO: PrintRequestVO): any {
    return this.http.post(this.serviceUrl+'/pdfAll', JSON.stringify(printRequestVO), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  downloadStudentsByTimestampRangePdf(printRequestVO: PrintRequestVO): any {
    return this.http.post(this.serviceUrl+'/pdfStudentsByTimestampRange', JSON.stringify(printRequestVO), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
      .map(
        (response: Response) => {
            return new Blob([response.blob()], { type: 'application/pdf' })
        }
    );
  }

  downloadStudentsByStudentIdsPdf(printRequestVO: PrintRequestVO): any {
    return this.http.post(this.serviceUrl+'/pdfStudentsByStudentIds', JSON.stringify(printRequestVO), {headers: this.httpHeaders(), responseType: ResponseContentType.Blob})
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

  getUserPreference() {

    console.log('in getUserPreference()');

//TODO

    let username: string = 'JohnDoe';                        //this.sessionDataService.user.username;
    console.log('username: ', username);
    console.log('url used: ', this.serviceUrl+"/userPreference");
    //this.http.get(this.serviceUrl+"/userPreference").subscribe();
    console.log('after http call');
    this.http.get(this.serviceUrl+"/userPreference/getByUsername/"+username, {headers: this.httpHeaders()})
              .map((response: Response) => {
                let userPreference = response.json() as UserPreference;
                console.log('userPreference = ', userPreference);
                this.sessionDataService.userPreferenceSubject.next(userPreference);
              })
              .catch(this.handleError)
              .subscribe();
  }

  getUserPreference2(): Observable<UserPreference> {
    console.log('in getUserPreference2()');

    console.log('in getUserPreference2() this.sessionDataService.user: ', this.sessionDataService.user);
    console.log('in getUserPreference2() this.sessionDataService.user.username: ', this.sessionDataService.user.username);
    let username: string = this.sessionDataService.user.username;
    console.log('in getUserPreference2() username: ', username);
    return this.http.get(this.serviceUrl+"/userPreference/getUiDtoByUsername/"+username, {headers: this.httpHeaders()})
    .map((response: Response) => {
      let userPreference = response.json() as UserPreference;
      console.log('userPreference = ', userPreference);
      this.sessionDataService.userPreferenceSubject.next(userPreference);
      this.sessionDataService.userPreference = userPreference;
      return userPreference;
    })
    .catch(this.handleError);


  }

  getAllSchoolYears(): Observable<SchoolYear[]> {
    return this.http.get(this.serviceUrl+"/schoolYear/getAllSchoolYearDtos",
                          {headers: this.httpHeaders()})
          .map(response => {
            let schoolYears = response.json() as SchoolYear[];
            schoolYears.forEach(schoolYear => {
              schoolYear.startDate = new Date(schoolYear.startDate);
              schoolYear.endDate = new Date(schoolYear.endDate);
            });
            return schoolYears;
          })
          .catch(this.handleError);
  }

  saveSchoolYear(schoolYear: SchoolYear): Observable<SchoolYear> {
    
    console.log('in saveSchoolYear, schoolYear: ', schoolYear);
    return this.http
      .post(this.serviceUrl+"/schoolYear/saveSchoolYearDto", JSON.stringify(schoolYear),
              {headers: this.httpHeaders()})
      .map(response => {
        return response.json() as SchoolYear;
      })
      .catch(this.handleError);
  }
    
  deleteSchoolYear(schoolYear: SchoolYear) {

    return this.http
      .delete(this.serviceUrl+"/schoolYear/deleteSchoolYearById/"+schoolYear.id, {headers: this.httpHeaders()})
      .catch(this.handleError);
  }

  saveUserPreference(userPreference: UserPreference): Observable<UserPreference> {
    
    console.log('in saveUserPreference, userPreference: ', userPreference);
    return this.http
      .post(this.serviceUrl+"/userPreference/saveUserPreferenceDto", JSON.stringify(userPreference),
              {headers: this.httpHeaders()})
      .map((response: Response) => {
        userPreference = response.json() as UserPreference;
        console.log('userPreference = ', userPreference);
        return userPreference;
      })
      .catch(this.handleError);
  }
    
  // getAllStudents(): Observable<Student[]> {
  //       return this.http.get(this.serviceUrl+"/getAllStudentDtos", {headers: this.httpHeaders()})
  //                 .map(response => {
  //                   let students = response.json() as Student[];
  //                   return students;
  //                 })
  //                 .catch(this.handleError);    
  // }

  getStudentsNotInSchoolYear(schoolYearId: number): Observable<Student[]> {
    return this.http.get(this.serviceUrl+"/getStudentsNotInSchoolYear/"+schoolYearId, {headers: this.httpHeaders()})
              .map(response => {
                let students = response.json() as Student[];
                return students;
              })
              .catch(this.handleError);    
  }

  getStudentsInSchoolYear(schoolYearId: number): Observable<Student[]> {
    return this.http.get(this.serviceUrl+"/getStudentsInSchoolYear/"+schoolYearId, {headers: this.httpHeaders()})
              .map(response => {
                let students = response.json() as Student[];
                return students;
              })
              .catch(this.handleError);    
  }
  
  saveRemoveStudentsToFromSchoolYear(saveRemoveStudentsToFromSchoolYearVO: SaveRemoveStudentsToFromSchoolYearVO) {
    return this.http.post(this.serviceUrl+"/saveRemoveStudentsToFromSchoolYear", JSON.stringify(saveRemoveStudentsToFromSchoolYearVO), {headers: this.httpHeaders()})
      .catch(this.handleError);    
  }
  
  saveRemoveStudentsToFromSchoolYear2(saveRemoveStudentsToFromSchoolYearVO2: SaveRemoveStudentsToFromSchoolYearVO2) {
    return this.http.post(this.serviceUrl+"/schoolYear/saveRemoveStudentsToFromSchoolYear", JSON.stringify(saveRemoveStudentsToFromSchoolYearVO2), {headers: this.httpHeaders()})
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
