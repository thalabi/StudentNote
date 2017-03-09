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

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
  
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

  // change to use fromTimestamp and toTimestamp as Date types
  onDownloadDateRangePdf(): void {
    console.log(this.fromTimestamp, this.toTimestamp);
    let timestampRange: TimestampRange = new TimestampRange();
    timestampRange.fromYear = this.fromTimestamp.year;
    timestampRange.fromMonth = this.fromTimestamp.month;
    timestampRange.fromDay = this.fromTimestamp.day;
    timestampRange.toYear = this.toTimestamp.year;
    timestampRange.toMonth = this.toTimestamp.month;
    timestampRange.toDay = this.toTimestamp.day;
    console.log('timestampRange: ', timestampRange);
    this.studentService.downloadStudentsByTimestampRangePdf(timestampRange).subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }
  
}
