import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

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
    this.studentService.downloadAllPdf().subscribe(
        (response) => {
        var pdfUrl = URL.createObjectURL(response);
        window.open(pdfUrl);
        }
    );
  }
  
}
