import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { TimestampRange } from '../TimestampRange';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  fromTimestamp: Date;
  toTimestamp: Date;
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

  onDownloadDateRangePdf(): void {
    let timestampRange: TimestampRange;
    timestampRange.fromYear = this.fromTimestamp.getFullYear();
    timestampRange.fromMonth = this.fromTimestamp.getMonth();
    timestampRange.fromDay = this.fromTimestamp.getDay();
    timestampRange.toYear = this.toTimestamp.getFullYear();
    timestampRange.toMonth = this.toTimestamp.getMonth();
    timestampRange.toDay = this.toTimestamp.getDay();
    console.log('timestampRange: ', timestampRange);
    // this.studentService.downloadAllPdf().subscribe(
    //     (response) => {
    //     var pdfUrl = URL.createObjectURL(response);
    //     window.open(pdfUrl);
    //     }
    // );
  }
  
}
