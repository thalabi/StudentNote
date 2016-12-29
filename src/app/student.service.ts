import { Injectable } from '@angular/core';
import { Student } from './Student';

@Injectable()
export class StudentService {

  constructor() { }

  getStudents(): Student[] {

    let studentArray: Student[] = [
      {id: 1, firstName: 'Tarif', lastName: 'Halabi', grade: 'gr-1'},
      {id: 2, firstName: 'May', lastName: 'Halabi', grade: 'gr-2'},
      {id: 3, firstName: 'Layla', lastName: 'Halabi', grade: 'gr-3'},
      {id: 4, firstName: 'Kareem', lastName: 'Halabi', grade: 'gr-4'}
    ];

    return studentArray;
  }
}
