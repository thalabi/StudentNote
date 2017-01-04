import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-student-details-form',
  templateUrl: './student-details-form.component.html',
  styleUrls: ['./student-details-form.component.css']
})
export class StudentDetailsFormComponent implements OnInit {

  complexForm : FormGroup;
  student: Student;
  crudMode: string = 'Add';
  gradeOptionArray: string[] = ['', 'JK', 'SK', '1', '2', '3', '4', '5'];

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.complexForm = this.fb.group({
      'firstName' : [{value: '', disabled: this.crudMode == 'Delete'}, Validators.required],
      'lastName': [{value: '', disabled: this.crudMode == 'Delete'},  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'grade' : [{value: '', disabled: this.crudMode == 'Delete'}]
    })


    this.complexForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged(); // (re)set validation messages now

  }

  onSubmit(){
    console.log("onSubmit()");
  }

  onValueChanged(data?: any) {
    if (!this.complexForm) { return; }
    const form = this.complexForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'firstName': '',
    'lastName': ''
  };

  validationMessages = {
    'firstName': {
      'required':      'Fisr name is required.'
    },
    'lastName': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 5 characters long.',
      'maxlength': 'Last name cannot be more than 10 characters long.'
    }
  };
}
