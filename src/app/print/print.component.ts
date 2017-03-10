import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { TimestampRange } from '../TimestampRange';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  fromTimestamp: any;
  toTimestamp: any;
  studentIds: number[] = [];
  timestampRange: TimestampRange = new TimestampRange();

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
  
  }

  onFromTimestampChange(event) {
    try {
      this.timestampRange.fromTimestamp = new Date(this.fromTimestamp.year, this.fromTimestamp.month-1, this.fromTimestamp.day);
    } catch (exception) {
      this.timestampRange.fromTimestamp = null;
    }
    console.log("this.timestampRange.fromTimestamp", this.timestampRange.fromTimestamp);
  }

  onToTimestampChange(event) {
    try {
      this.timestampRange.toTimestamp = new Date(this.toTimestamp.year, this.toTimestamp.month-1, this.toTimestamp.day, 23, 59, 59, 999);
    } catch (exception) {
      this.timestampRange.toTimestamp = null;
    }
    console.log("this.timestampRange.toTimestamp", this.timestampRange.toTimestamp);
  }
  
  onCheckboxChange(event) {
    console.log('onCheckboxChange: ', event.target.checked, event.target.value);
    // console.log('onCheckboxChange: ', event);
    if (event.target.checked) {
      this.studentIds[this.studentIds.length] = event.target.value;
    } else {
      let index = this.studentIds.indexOf(event.target.value);
      if (index > -1) {
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
    //this.timestampRange.fromTimestamp = new Date(this.fromTimestamp.year, this.fromTimestamp.month-1, this.fromTimestamp.day);
    //this.timestampRange.toTimestamp = new Date(this.toTimestamp.year, this.toTimestamp.month-1, this.toTimestamp.day, 23, 59, 59, 999);
    console.log('this.timestampRange: ', this.timestampRange);
    this.studentService.downloadStudentsByTimestampRangePdf(this.timestampRange).subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }
}
