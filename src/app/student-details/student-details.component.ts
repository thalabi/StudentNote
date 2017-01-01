import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    //console.log('StudentDetailsComponent begin ...');
    //console.log('id: ' + this.activatedRoute.snapshot.params['id']);
    this.crudMode = this.activatedRoute.snapshot.params['crudMode'];
    //console.log('crudMode: ' + this.crudMode);
    if (this.crudMode == 'Add') {
      //this.student = {id: null, firstName: '', lastName: '', grade: ''};
      this.student = new Student();
    } else {
      this.student = this.studentService.getStudentById(this.activatedRoute.snapshot.params['id']);
    }
    //console.log('this.student.firstName: ' + this.student.firstName);
    //console.log('StudentDetailsComponent end ...');
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
