import { Injectable } from '@angular/core';
import { Student } from './dto/Student';
import { User } from './security/user';
import { UserPreference } from './dto/UserPreference';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionDataService {

    //public storage: any;
    public student: Student;
    public crudMode: string;
    public noteListIndex: number;

    public user: User;
    public userPreference: UserPreference;

    public userSubject: Subject<User>;// = Subject.from([null]);
    public userPreferenceSubject: Subject<UserPreference>;// = Subject.from([null]);

    constructor() {
        this.userSubject = new Subject<User>();
        this.userSubject.next(new User());
        this.userPreferenceSubject = new Subject<UserPreference>();
        this.userPreferenceSubject.next(new UserPreference());

    }

}
