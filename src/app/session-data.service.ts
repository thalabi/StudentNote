import { Injectable } from '@angular/core';
import { Student } from './Student';
@Injectable()
export class SessionDataService {

  //public storage: any;
  public student: Student;
  public crudMode: string;
  public noteListIndex: number;

  constructor() { }

}
