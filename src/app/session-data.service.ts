import { Injectable } from '@angular/core';
import { Student } from './Student';
import { User } from './security/user';
@Injectable()
export class SessionDataService {

  //public storage: any;
  public student: Student;
  public crudMode: string;
  public noteListIndex: number;

  public user: User;

  constructor() { }

}
