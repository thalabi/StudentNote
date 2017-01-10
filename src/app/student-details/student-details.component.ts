import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  student: Student;
  crudMode: string;
  okButtonsDisable: boolean = false;
  gradeOptionArray: string[] = ['JK', 'SK', '1', '2', '3', '4', '5'];

  constructor (
    private studentService: StudentService,
    private sessionDataService: SessionDataService,    
    private router: Router) {}

  ngOnInit() {
    this.crudMode = this.sessionDataService.crudMode;
    if (this.crudMode == 'Add') {
      this.student = new Student();
    } else {
      this.student = Object.assign({}, this.sessionDataService.student);
      console.log(JSON.stringify(this.student));
    }
  }

  onSubmit() {
    switch (this.crudMode) {
      case 'Add':
        this.studentService.saveStudent(this.student);
        break;
      case 'Modify':
        this.studentService.saveStudent(this.student);
        break;
      case 'Delete':
        this.studentService.deleteStudent(this.student);
        break;
      default:
        console.error('this.crudMode is invalid. this.crudMode: ' + this.crudMode);
    }
    this.router.navigate(['studentTable']);
  }
  
  onCancel() {
      this.router.navigate(['studentTable']);
  }
}
