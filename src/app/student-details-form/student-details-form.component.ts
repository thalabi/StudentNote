import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../dto/Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { MessageService } from './../error/message.service';
import { Grade } from 'app/dto/Grade';
import { SchoolYear } from 'app/dto/SchoolYear';
import { ConfirmationService } from 'primeng/primeng';

@Component({
    selector: 'app-student-details-form',
    templateUrl: './student-details-form.component.html',
    styleUrls: ['./student-details-form.component.css']
})
export class StudentDetailsFormComponent implements OnInit {

    studentForm: FormGroup;
    student: Student;
    crudMode: string;
    gradeOptionArray: string[] = ['JK', 'SK', '1', '2', '3', '4', '5', '6', '7', '8', 'Other'];

    constructor(
        private formBuilder: FormBuilder,
        private studentService: StudentService,
        private sessionDataService: SessionDataService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.messageService.clear();

        this.crudMode = this.sessionDataService.crudMode;
        if (this.crudMode == 'Add') {
            this.student = new Student();
            this.student.grade = new Grade();
            this.student.grade.grade = 'Other';
            this.student.schoolYear = this.sessionDataService.userPreference.schoolYear;
        } else {
            this.student = Object.assign({}, this.sessionDataService.student);
            console.log(JSON.stringify(this.student));
        }

        this.studentForm = this.formBuilder.group({
            'nameGroup': this.formBuilder.group({
                'firstName': [{ value: this.student.firstName, disabled: this.crudMode == 'Delete' }],
                'lastName': [{ value: this.student.lastName, disabled: this.crudMode == 'Delete' }]
            }, { validator: nameNotNullValidator }),
            'grade': [{ value: this.student.grade.grade, disabled: this.crudMode == 'Delete' }]
        })


        this.studentForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        //this.onValueChanged(); // (re)set validation messages now

    }

    onSubmit() {
        console.log("onSubmit(), this.student: ", this.student);
        console.log("onSubmit(), this.studentForm.get(\'firstName\').value: ", this.studentForm.get('nameGroup.firstName').value);
        this.student.firstName = this.studentForm.get('nameGroup.firstName').value;
        this.student.lastName = this.studentForm.get('nameGroup.lastName').value;
        this.student.grade.grade = this.studentForm.get('grade').value;
        // let grade : Grade = new Grade();
        // grade.grade = this.studentForm.get('grade').value;
        // console.log('this.student.gradeSet[0]',this.student.gradeSet[0]);
        // this.student.gradeSet[0] = grade;
        //console.log('this.student.gradeSet[0]',this.student.gradeSet[0]);
        //this.student.schoolYearSet.push(schoolYear);
        //this.student.schoolYearSet = [this.sessionDataService.userPreference.schoolYear];
        console.log('this.student', this.student);
        switch (this.crudMode) {
            case 'Add':
                this.studentService.addStudentDetails(this.student)
                    .subscribe({
                        error: error => {
                            console.error(error);
                            this.messageService.error(error);
                        },
                        complete: () => {
                            this.router.navigate(['studentTable']);
                        }
                    });
                break;
            case 'Modify':
                console.log('before call to studentService');
                this.studentService.updateStudentDetails(this.student)
                    .subscribe({
                        error: error => {
                            console.error(error);
                            this.messageService.error(error);
                        },
                        complete: () => {
                            this.router.navigate(['studentTable']);
                        }
                    });
                break;
            case 'Delete':
                this.confirmationService.confirm({
                    message: null, // message is defined in the confirmation tag
                    accept: () => {
                        this.studentService.deleteStudent(this.student)
                            .subscribe({
                                error: error => {
                                    console.error(error);
                                    this.messageService.error(error);
                                },
                                complete: () => {
                                    //console.log('student: ', student);
                                    this.router.navigate(['studentTable']);
                                }
                            });
                    }
                });
                break;
            default:
                console.error('this.crudMode is invalid. this.crudMode: ' + this.crudMode);
        }
        //this.router.navigate(['studentTable']);
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

    formErrors = {
        'nameGroup': {
            'firstName': '',
            'lastName': ''
        }
    };

    validationMessages = {
        'nameGroup': {
            'firstName': {
                'required': 'Fisr name is required.'
            },
            'lastName': {
                'required': 'Last name is required.',
                'minlength': 'Last name must be at least 5 characters long.',
                'maxlength': 'Last name cannot be more than 10 characters long.'
            }
        }
    };

    confirm() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }

}
function nameNotNullValidator({ value }: FormGroup): { [key: string]: any } {
    const [firstName, lastName] = Object.keys(value || {});
    const test = value[firstName] || value[lastName];
    return test ? null : { nameNotNull: true };
}
