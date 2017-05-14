import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw'

import { Constants } from '../constants';
import { User } from './user';
import { SessionDataService } from '../session-data.service';
import { MessageService } from './../error/message.service';
import { ConfigService } from './../config/config.service';
import { ApplicationProperties } from './../config/application.properties';
 
@Injectable()
export class AuthenticationService {

    user: User;
    userSubject: Subject<User>;// = Subject.from([null]);
    isAuthenticated: boolean = false;

    private jsonHeaders = new Headers({'Content-Type': 'application/json'});

    serviceUrl: string;

    constructor(
      private http: Http,
      private sessionDataService: SessionDataService,
      private nessageService: MessageService,
      private configService: ConfigService
    ) {
      this.userSubject = new Subject<User>();
      this.userSubject.next(new User());

      const applicationProperties: ApplicationProperties = this.configService.getApplicationProperties();
      this.serviceUrl = applicationProperties.serviceUrl;
      console.log(this.serviceUrl);
    }
 
    login(username: string, password: string): Observable<any> {
        return this.http.post(this.serviceUrl+'/Security/authenticate', JSON.stringify({ username: username, password: password }), {headers: this.jsonHeaders})
            .map((response: Response) => {
                console.log('response: ', response);
                // login successful if there's a jwt token in the response
                this.user = response.json();
                if (this.user && this.user.token) {
                    // store user details in SessionDataService
                    this.isAuthenticated = true;
                    this.userSubject.next(this.user);
                    this.sessionDataService.user = this.user;
                    console.log('JSON.stringify(this.user): ', JSON.stringify(this.user));
                    console.log('this.user: ', this.user);
                    for (let authority of this.user.authorities) {
                        console.log('authority: ', authority);
                    }
                    //throw('Something went wrong on our end (test)')
                } else {
                    // TODO should indicate an exception
                    throw('Something went wrong on our end');
                //     //this.userObservable = Observable.from([null]);
                //     this.isAuthenticated = false;
                //     this.sessionDataService.user = null;
                //     throw ('Login invalid');
                }
            }
            )
            // .map(this.processResponse)
            .catch(this.handleError);
    }
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.userSubject.next(null);
        this.sessionDataService.user = null;
    }
    private processResponse (response: Response) {
    }
    private handleError (response: Response | any) {
        console.log(response);
        let errorMessage: string;
        if (response instanceof Response) {
            if (response.status = 401) {
                errorMessage = 'Login failed; invalid username or password'
            } else {
                const bodyJson = response.json() || '';
                const serverErrorMessage = bodyJson.errorMessage || JSON.stringify(bodyJson);
                console.error(serverErrorMessage);
                errorMessage = `HTTP: ${response.status} - ${response.statusText || ''}. Server error message: ${serverErrorMessage}`;
            }
        } else {
            errorMessage = response.message ? response.message : response.toString();
        }
        return Observable.throw(errorMessage);
    }
}