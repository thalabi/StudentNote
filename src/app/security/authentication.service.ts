import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map'

import { Constants } from './../constants';
import { User } from './user';
 
@Injectable()
export class AuthenticationService {

    user: User;
    userSubject: Subject<User>;// = Subject.from([null]);
    isAuthenticated: boolean = false;

    private jsonHeaders = new Headers({'Content-Type': 'application/json'});

    constructor(
      private http: Http) {
        this.userSubject = new Subject<User>();
        this.userSubject.next(new User())
       }
 
    login(username: string, password: string) {
        return this.http.post(Constants.STUDENT_NOTES_SERVICE_URL+'/Security/authenticate', JSON.stringify({ username: username, password: password }), {headers: this.jsonHeaders})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                this.user = response.json();
                if (this.user && this.user.token
                && this.user.username == 'x') {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify(this.user));
                    this.isAuthenticated = true;
                    this.userSubject.next(this.user);
                } else {
                    //this.userObservable = Observable.from([null]);
                    this.isAuthenticated = false;
                    throw ('Login invalid');
                }
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        this.isAuthenticated = false;
        this.userSubject.next(null);
    }

}