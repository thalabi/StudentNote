import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { StudentService } from './../student.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../constants';

@Component({
  selector: 'app-datatable-crud',
  templateUrl: './school-year-crud.component.html',
  styleUrls: ['./school-year-crud.component.css']
})
export class SchoolYearCrudComponent implements OnInit {

  displayDialog: boolean;
  selectedSchoolYear: SchoolYear;
  schoolYears: SchoolYear[];
  modifyAndDeleteButtonsDisable : boolean = true;
  crudMode: string;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadSchoolYears();
    this.selectedSchoolYear = new SchoolYear();
  }

  loadSchoolYears() {
    this.studentService.getAllSchoolYears().subscribe({
      next: schoolYears => {
        this.schoolYears = schoolYears;
      },
      error: error => {
        console.error(error);
        // TODO uncomment later
        //this.messageService.clear();
        //this.messageService.error(error);
      }});
  }

  onRowSelect(event) {
    this.modifyAndDeleteButtonsDisable = false;
  }

  onRowUnselect(event) {
    this.modifyAndDeleteButtonsDisable = true;
  }

  showDialog(crudMode: string) {
    this.crudMode = crudMode;
    console.log('crudMode', crudMode);
    console.log('this.crudMode', this.crudMode);
    if (crudMode == 'Add') {
      this.selectedSchoolYear = new SchoolYear();
      this.selectedSchoolYear.schoolYear = '';
      this.selectedSchoolYear.startDate = undefined;
      this.selectedSchoolYear.endDate = undefined;
    } else {
      //this.selectedSchoolYear.startDate = new Date(this.selectedSchoolYear.startDate);
      //this.selectedSchoolYear.endDate = new Date(this.selectedSchoolYear.endDate);
      console.log(this.selectedSchoolYear);
      }
    this.displayDialog = true;
  }

  onSubmit() {
    console.log('this.selectedSchoolYear', this.selectedSchoolYear);
    let schoolYear: SchoolYear = this.selectedSchoolYear;
    console.log('schoolYear', schoolYear);
    if (this.crudMode != 'Delete') {
      this.studentService.saveSchoolYear(schoolYear)
      .subscribe({
          error: error => {
            console.error(error);
            // this.messageService.clear();
            // this.messageService.error(error);
          },
          complete: () => {
            this.loadSchoolYears();
          }
      });
    } else {
      this.studentService.deleteSchoolYear(schoolYear)
      .subscribe({
          error: error => {
            console.error(error);
            // this.messageService.clear();
            // this.messageService.error(error);
          },
          complete: () => {
            this.loadSchoolYears();
          }
      });
    }
      this.displayDialog = false;
  }

  onCancel() {
    this.displayDialog = false;
  }
}
