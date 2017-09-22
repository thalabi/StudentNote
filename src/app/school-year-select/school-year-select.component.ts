import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { StudentService } from './../student.service';
import { SessionDataService } from '../session-data.service';
import {SelectItem} from 'primeng/primeng';
import { UserPreference } from '../domain/UserPreference';

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
    private studentService: StudentService,
    private sessionDataService: SessionDataService
  ) {  }

  ngOnInit() {
    this.loadSchoolYears();
    console.log('this.sessionDataService.userPreference', this.sessionDataService.userPreference);
    // this.sessionDataService.userPreferenceSubject
    // //.map((data:User)=>{console.log(data})
    // .subscribe(
    //   data => {
    //     this.userPreference = data;
    //     console.log('second userPreference: ', this.userPreference);
    //   },
    //   error => console.error(error),
    //   () => console.log('completed')
    // );  

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
    console.log('this.sessionDataService.userPreference', this.sessionDataService.userPreference);
    let userPreference : UserPreference = this.sessionDataService.userPreference;
    userPreference.schoolYear = this.selectedSchoolYear;
    console.log('userPreference', userPreference);
    this.studentService.saveUserPreference(userPreference)
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
}
