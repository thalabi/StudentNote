import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { StudentService } from './../student.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-school-year-select',
  templateUrl: './school-year-select.component.html',
  styleUrls: ['./school-year-select.component.css']
})
export class SchoolYearSelectComponent implements OnInit {

  schoolYears: SchoolYear[];
  schoolYearSelectItems: SelectItem[] = [];
  selectedSchoolYear: SchoolYear;
  
  constructor(
    private studentService: StudentService
  ) {  }

  ngOnInit() {
    this.loadSchoolYears();
  }

  loadSchoolYears() {
    this.studentService.getAllSchoolYears().subscribe({
      next: schoolYears => {
        this.schoolYears = schoolYears;
        for (let schoolYear of this.schoolYears) {
          this.schoolYearSelectItems.push({label: schoolYear.schoolYear, value: schoolYear});
        }
        console.log('this.schoolYearSelectItems.length', this.schoolYearSelectItems.length);
      },
      error: error => {
        console.error(error);
        // TODO uncomment later
        //this.messageService.clear();
        //this.messageService.error(error);
      }});
  }

  onSubmit() {
    console.log('this.selectedSchoolYear', this.selectedSchoolYear);
  }    
}
