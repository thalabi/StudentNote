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
      'nameGroup' : this.fb.group({
        'firstName' : [{value: '', disabled: this.crudMode == 'Delete'}, Validators.required],
        'lastName': [{value: '', disabled: this.crudMode == 'Delete'},  Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])]
      }),
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
    console.log('onValueChanged');
    if (!this.complexForm) { return; }
    const form = this.complexForm;
    console.log(form);
    console.log('grade: ', form.get('grade'));
    console.log('nameGroup: ', form.get('nameGroup'));
    const nameGroup = form.get('nameGroup');
    console.log('firstName', nameGroup.get('firstName'));
    for (const field in this.formErrors.nameGroup) {
      console.log(field);
      // clear previous error message (if any)
      this.formErrors.nameGroup[field] = '';
      const control = nameGroup.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages.nameGroup[field];
        for (const key in control.errors) {
          this.formErrors.nameGroup[field] += messages[key] + ' ';
        }
      }
    }
  }

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

  equalValidator({value}: FormGroup): {[key: string]: any} {
    const [first, ...rest] = Object.keys(value || {});
    const valid = rest.every(v => value[v] === value[first]);
    return valid ? null : {equal: true};
  }

}
