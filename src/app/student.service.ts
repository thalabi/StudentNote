import { Injectable } from '@angular/core';
import { Student } from './dto/Student';
import { Note } from './dto/Note';
import { SchoolYear } from './dto/SchoolYear';
import { UserPreference } from './dto/UserPreference';

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
import { SaveRemoveStudentsToFromSchoolYearVo } from 'app/vo/SaveRemoveStudentsToFromSchoolYearVo';
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
      'Content-Type': 'application/json'
    });
  }

  getStudents(): Observable<Student[]> {
    let username: string = this.sessionDataService.user.username;
    let schoolYearId: number = this.sessionDataService.userPreference.schoolYear.id;
    return this.http.get(this.serviceUrl + "/getStudentGraphBySchoolYear/" + schoolYearId, { headers: this.httpHeaders() })
      .map(response => {
        return response.json() as Student[];
      })
      .catch(this.handleError);
  }

  addStudentDetails(student: Student): Observable<Student> {

    return this.http
      .post(this.serviceUrl + "/addStudentDetails", JSON.stringify(student), { headers: this.httpHeaders() })
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  updateStudentDetails(student: Student): Observable<Student> {

    return this.http
      .post(this.serviceUrl + "/updateStudentDetails", JSON.stringify(student), { headers: this.httpHeaders() })
      .map(response => response.json() as Student)
      .catch(this.handleError);
  }

  deleteStudent(student: Student) {

    return this.http
      .delete(this.serviceUrl + "/deleteStudentById/" + student.id, { headers: this.httpHeaders() })
      .catch(this.handleError);
  }

  addNote(noteRequestVo: NoteRequestVo): Observable<NoteRequestVo> {
    return this.http
      .post(this.serviceUrl + "/noteResource/addNote", JSON.stringify(noteRequestVo), { headers: this.httpHeaders() })
      .map(response => response.json() as NoteRequestVo)
      .catch(this.handleError);
  }

  updateNote(noteRequestVo: NoteRequestVo): Observable<NoteRequestVo> {
    return this.http
      .post(this.serviceUrl + "/noteResource/updateNote", JSON.stringify(noteRequestVo), { headers: this.httpHeaders() })
      .map(response => response.json() as NoteRequestVo)
      .catch(this.handleError);
  }

  deleteNote(noteRequestVo: NoteRequestVo): Observable<NoteRequestVo> {
    return this.http
      .post(this.serviceUrl + "/noteResource/deleteNote", JSON.stringify(noteRequestVo), { headers: this.httpHeaders() })
      .map(response => response.json() as NoteRequestVo)
      .catch(this.handleError);
  }

  downloadAllPdf(printRequestVO: PrintRequestVO): any {
    return this.http.post(this.serviceUrl + '/PrintResource/pdfAll', JSON.stringify(printRequestVO), { headers: this.httpHeaders(), responseType: ResponseContentType.Blob })
      .map(
      (response: Response) => {
        return new Blob([response.blob()], { type: 'application/pdf' })
      }
      );
  }

  downloadStudentsByTimestampRangePdf(printRequestVO: PrintRequestVO): any {
    return this.http.post(this.serviceUrl + '/PrintResource/pdfStudentsByTimestampRange', JSON.stringify(printRequestVO), { headers: this.httpHeaders(), responseType: ResponseContentType.Blob })
      .map(
      (response: Response) => {
        return new Blob([response.blob()], { type: 'application/pdf' })
      }
      );
  }

  downloadStudentsByStudentIdsPdf(printRequestVO: PrintRequestVO): any {
    return this.http.post(this.serviceUrl + '/PrintResource/pdfStudentsByStudentIds', JSON.stringify(printRequestVO), { headers: this.httpHeaders(), responseType: ResponseContentType.Blob })
      .map(
      (response: Response) => {
        return new Blob([response.blob()], { type: 'application/pdf' })
      }
      );
  }

  getVersion(): Observable<string> {
    return this.http.get(this.serviceUrl + "/getVersion")
      .map(response => response.text())
      .catch(this.handleError);
  }

  getUserPreference(): Observable<UserPreference> {
    let username: string = this.sessionDataService.user.username;
    console.log('in getUserPreference2() username: ', username);
    return this.http.get(this.serviceUrl + "/userPreference/getUiDtoByUsername/" + username, { headers: this.httpHeaders() })
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
    return this.http.get(this.serviceUrl + "/schoolYear/getAllSchoolYearDtos",
      { headers: this.httpHeaders() })
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
      .post(this.serviceUrl + "/schoolYear/saveSchoolYearDto", JSON.stringify(schoolYear),
      { headers: this.httpHeaders() })
      .map(response => {
        return response.json() as SchoolYear;
      })
      .catch(this.handleError);
  }

  deleteSchoolYear(schoolYear: SchoolYear) {
    return this.http
      .delete(this.serviceUrl + "/schoolYear/deleteSchoolYearById/" + schoolYear.id, { headers: this.httpHeaders() })
      .catch(this.handleError);
  }

  saveUserPreference(userPreference: UserPreference): Observable<UserPreference> {
    console.log('in saveUserPreference, userPreference: ', userPreference);
    return this.http
      .post(this.serviceUrl + "/userPreference/saveUserPreferenceUiDto", JSON.stringify(userPreference),
      { headers: this.httpHeaders() })
      .map((response: Response) => {
        userPreference = response.json() as UserPreference;
        console.log('userPreference = ', userPreference);
        return userPreference;
      })
      .catch(this.handleError);
  }

  getStudentsNotInSchoolYear(schoolYearId: number): Observable<Student[]> {
    return this.http.get(this.serviceUrl + "/getStudentsNotInSchoolYear/" + schoolYearId, { headers: this.httpHeaders() })
      .map(response => {
        let students = response.json() as Student[];
        return students;
      })
      .catch(this.handleError);
  }

  getStudentsInSchoolYear(schoolYearId: number): Observable<Student[]> {
    return this.http.get(this.serviceUrl + "/getStudentsInSchoolYear/" + schoolYearId, { headers: this.httpHeaders() })
      .map(response => {
        let students = response.json() as Student[];
        return students;
      })
      .catch(this.handleError);
  }

  saveRemoveStudentsToFromSchoolYear2(saveRemoveStudentsToFromSchoolYearVO2: SaveRemoveStudentsToFromSchoolYearVo) {
    return this.http.post(this.serviceUrl + "/schoolYear/saveRemoveStudentsToFromSchoolYear", JSON.stringify(saveRemoveStudentsToFromSchoolYearVO2), { headers: this.httpHeaders() })
      .catch(this.handleError);
  }

  private handleError(response: Response | any) {
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
