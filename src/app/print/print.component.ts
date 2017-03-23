import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { TimestampRange } from '../TimestampRange';
import { Student } from '../Student';
import {NgbDateStruct, NgbTabset } from '@ng-bootstrap/ng-bootstrap';


import { MessageService } from './../error/message.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  fromTimestamp: NgbDateStruct;
  toTimestamp: NgbDateStruct;
  studentIds: number[] = [];
  timestampRange: TimestampRange = new TimestampRange();
  studentArray: Student[];


  constructor(
    private studentService: StudentService,
    private nessageService: MessageService
  ) { }

  ngOnInit() {
    this.studentService.getAllStudentsWithoutNotesList().subscribe(
      students => {
        this.studentArray = students;
        console.log('studentArray[]: ', this.studentArray);
      });

      let today = new Date();
      this.toTimestamp = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
  }

  onTabsetChange(tab: NgbTabset) {
    // Note: the activeId is the id of the tab that was selected before the change event
    switch (tab.activeId) {
      case 'allTab':
        break;
      case 'dateRangeTab':
        this.fromTimestamp = undefined;
        let today = new Date();
        this.toTimestamp = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
        break;
      case 'studentSelectTab':
        this.studentIds = [];
        break;
      default:
        throw('Some went wrong on our end. Invalid activeId: '+ tab.activeId);
    }
  }
  onSelectStudentCheckbox(event) {
    console.log('onSelectStudentCheckbox: ', event.target.checked, event.target.value);
    // console.log('onSelectStudentCheckbox: ', event);
    if (event.target.checked) {
      this.studentIds[this.studentIds.length] = event.target.value;
    } else {
      let index = this.studentIds.indexOf(event.target.value);
      if (index > 1) {
        this.studentIds.splice(index,1);
      }
    }
  }
  
  onDownloadAllPdf(): void {
    this.studentService.downloadAllPdf().subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }
  
  onDownloadDateRangePdf(): void {
    console.log(this.fromTimestamp, this.toTimestamp);
    this.timestampRange.fromTimestamp = new Date(this.fromTimestamp.year, this.fromTimestamp.month-1, this.fromTimestamp.day);
    this.timestampRange.toTimestamp = new Date(this.toTimestamp.year, this.toTimestamp.month-1, this.toTimestamp.day, 23, 59, 59, 999);
    console.log('this.timestampRange: ', this.timestampRange);
    this.studentService.downloadStudentsByTimestampRangePdf(this.timestampRange).subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }

  onDownloadStudentSelectPdf(): void {
    console.log("studentIds: ", this.studentIds);
    this.studentService.downloadStudentsByStudentIdsPdf(this.studentIds).subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }

  ngbDateStructToDate (ngbDateStruct: NgbDateStruct): Date {
    return new Date(ngbDateStruct.year, ngbDateStruct.month-1, ngbDateStruct.day);
  } 
}
