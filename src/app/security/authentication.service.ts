import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map'

import { Constants } from '../constants';
import { User } from './user';
import { SessionDataService } from '../session-data.service';
 
@Injectable()
export class AuthenticationService {

    user: User;
    userSubject: Subject<User>;// = Subject.from([null]);
    isAuthenticated: boolean = false;

    private jsonHeaders = new Headers({'Content-Type': 'application/json'});

    constructor(
      private http: Http,
      private sessionDataService: SessionDataService) {
        this.userSubject = new Subject<User>();
        this.userSubject.next(new User())
       }
 
    login(username: string, password: string) {
        return this.http.post(Constants.STUDENT_NOTES_SERVICE_URL+'/Security/authenticate', JSON.stringify({ username: username, password: password }), {headers: this.jsonHeaders})
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
                } else {
                    //this.userObservable = Observable.from([null]);
                    this.isAuthenticated = false;
                    this.sessionDataService.user = null;
                    throw ('Login invalid');
                }
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.userSubject.next(null);
        this.sessionDataService.user = null;
    }

}