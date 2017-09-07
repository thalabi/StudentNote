import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { TimestampRange } from '../TimestampRange';
import { Student } from '../Student';
import { MessageService } from './../error/message.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  fromTimestamp: Date;
  toTimestamp: Date;
  selectedStudents: Student[] = [];
  timestampRange: TimestampRange = new TimestampRange();
  studentArray: Student[];

  constructor(
    private studentService: StudentService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.clear();

    this.studentService.getAllStudentsWithoutNotesList().subscribe(
      students => {
        this.studentArray = students;
        console.log('studentArray[]: ', this.studentArray);
      });

      this.toTimestamp = new Date();
  }

  onTabChange(event) {
    console.log(event.index);
    let tabIndex = event.index;
    switch (tabIndex) {
      case 0:
        break;
      case 1:
        // this.fromTimestamp = undefined;
        // let today = new Date();
        // this.toTimestamp = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
        this.fromTimestamp = undefined;
        this.toTimestamp = new Date();      
        break;
      case 2:
        this.selectedStudents = [];
        break;
      default:
        throw('Something went wrong on our end. Invalid tabIndex: '+ tabIndex);
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
    this.timestampRange.fromTimestamp = this.fromTimestamp;
    this.timestampRange.toTimestamp = new Date(this.toTimestamp.getFullYear(), this.toTimestamp.getMonth(), this.toTimestamp.getDate(), 23, 59, 59, 999);
    
    console.log('this.timestampRange: ', this.timestampRange);
    this.studentService.downloadStudentsByTimestampRangePdf(this.timestampRange).subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }

  onDownloadStudentSelectPdf(): void {
    let studentIds: number[] = [];
    for (let student of this.selectedStudents) {
      studentIds.push(student.id);
    }
    console.log("studentIds: ", studentIds);
    this.studentService.downloadStudentsByStudentIdsPdf(studentIds).subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }
}