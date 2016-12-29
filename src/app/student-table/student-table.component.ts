import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  studentArray: Student[];

  constructor (
    private studentService: StudentService,
    private router: Router) {}

  ngOnInit () {
    console.log('begin ...');
    this.studentArray = this.studentService.getStudents()
    console.log('length: ' + this.studentArray.length);
    console.log('end ...');
  }

  title = 'app works!';

  rowOnClick (student: Student) {
    console.log('StudentTableComponent begin ...');
    console.log('student.id: '+student.id);
    this.router.navigate(['/studentDetails', student.id]);
    console.log('StudentTableComponent end ...');
  }
}
