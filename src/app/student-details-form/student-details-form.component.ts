import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details-form',
  templateUrl: './student-details-form.component.html',
  styleUrls: ['./student-details-form.component.css']
})
export class StudentDetailsFormComponent implements OnInit {

  studentForm : FormGroup;
  student: Student;
  crudMode: string;
  gradeOptionArray: string[] = ['JK', 'SK', '1', '2', '3', '4', '5'];

  constructor(
    private formBuilder: FormBuilder,
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

    this.studentForm = this.formBuilder.group({
      'nameGroup' : this.formBuilder.group({
        'firstName' : [{value: this.student.firstName, disabled: this.crudMode == 'Delete'}],
        'lastName': [{value: this.student.lastName, disabled: this.crudMode == 'Delete'}]
      }, {validator: nameNotNullValidator}),
      'grade' : [{value: this.student.grade, disabled: this.crudMode == 'Delete'}]
    })


    this.studentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    //this.onValueChanged(); // (re)set validation messages now

  }

  onSubmit(){
    console.log("onSubmit(), this.student: ", this.student);
    console.log("onSubmit(), this.studentForm.get(\'firstName\').value: ", this.studentForm.get('nameGroup.firstName').value);
    this.student.firstName = this.studentForm.get('nameGroup.firstName').value;
    this.student.lastName = this.studentForm.get('nameGroup.lastName').value;
    this.student.grade = this.studentForm.get('grade').value;
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
      this.router.navigate(['/studentTable']);
  }

  onValueChanged(data?: any) {
    console.log('onValueChanged');
    if (!this.studentForm) { return; }
    const form = this.studentForm;
    console.log(form);
/*    console.log('grade: ', form.get('grade'));
    console.log('nameGroup: ', form.get('nameGroup'));
*/    const nameGroup = form.get('nameGroup');
    console.log('nameGroup.valid: ', nameGroup.valid);
    console.log('form.touched: ', form.touched);
    console.log('nameGroup.touched: ', nameGroup.touched);
    this.nameGroupValid = nameGroup.valid;// && form.touched;
    console.log('nameGroupValid', this.nameGroupValid);
    console.log(true && true);
    console.log(false && false);
/*    console.log('firstName', nameGroup.get('firstName'));
*/    for (const field in this.formErrors.nameGroup) {
/*      console.log(field);
*/      // clear previous error message (if any)
      this.formErrors.nameGroup[field] = '';
      const control = nameGroup.get(field);
/*      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages.nameGroup[field];
        for (const key in control.errors) {
          this.formErrors.nameGroup[field] += messages[key] + ' ';
        }
      }
*/    }
  }
  nameGroupValid: boolean = true;
  nameGroupMessage: string = 'First name or last name must not be blank';

  formErrors = {
    'nameGroup': {
      'firstName': '',
      'lastName': ''
    }
  };

  validationMessages = {
    'nameGroup': {
      'firstName': {
        'required':      'Fisr name is required.'
      },
      'lastName': {
        'required': 'Last name is required.',
        'minlength': 'Last name must be at least 5 characters long.',
        'maxlength': 'Last name cannot be more than 10 characters long.'
      }
    }
  };


}
function nameNotNullValidator({value}: FormGroup): {[key: string]: any} {
  const [firstName, lastName] = Object.keys(value || {});
  const test = value[firstName] || value[lastName];
  return test ? null : {nameNotNull: true};
}
