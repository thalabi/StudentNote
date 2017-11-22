import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../dto/Student';
import { MessageService } from './../error/message.service';
import { PrintRequestVO } from 'app/vo/PrintRequestVO';
import { SessionDataService } from 'app/session-data.service';
import { Router } from '@angular/router';
import { DateUtils } from 'app/util/DateUtils';

@Component({
    selector: 'app-print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

    fromTimestamp: Date;
    toTimestamp: Date;
    selectedStudents: Student[] = [];
    studentArray: Student[];

    schoolYearStartDate: Date;
    schoolYearEndDate: Date;

    constructor(
        private studentService: StudentService,
        private sessionDataService: SessionDataService,
        private router: Router,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.messageService.clear();

        this.schoolYearStartDate = new Date(this.sessionDataService.userPreference.schoolYear.startDate);
        this.schoolYearEndDate = new Date(this.sessionDataService.userPreference.schoolYear.endDate);

        //this.studentService.getAllStudentsWithoutNotesList().subscribe(
        this.studentService.getStudents().subscribe(
            students => {
                this.studentArray = students;
                console.log('studentArray[]: ', this.studentArray);
            });
    }

    onTabChange(event) {
        console.log(event.index);
        let tabIndex = event.index;
        switch (tabIndex) {
            case 0:
                break;
            case 1:
                let now: Date = new Date();
                if (now >= this.schoolYearStartDate && now <= DateUtils.endOfDay(this.schoolYearEndDate)) {
                    this.fromTimestamp = DateUtils.startOfDay(now);
                    this.toTimestamp = DateUtils.endOfDay(now);
                } else {
                    this.fromTimestamp = this.schoolYearStartDate;
                    this.toTimestamp = DateUtils.endOfDay(this.schoolYearEndDate);
                }
                break;
            case 2:
                this.selectedStudents = [];
                break;
            default:
                throw ('Something went wrong on our end. Invalid tabIndex: ' + tabIndex);
        }
    }

    onDownloadAllPdf(): void {
        let printRequestVO: PrintRequestVO = new PrintRequestVO();
        printRequestVO.schoolYearId = this.sessionDataService.userPreference.schoolYear.id;

        this.studentService.downloadAllPdf(printRequestVO).subscribe(
            (response) => {
                var pdfUrl = URL.createObjectURL(response);
                window.open(pdfUrl);
            }
        );
    }

    onDownloadDateRangePdf(): void {
        console.log(this.fromTimestamp, this.toTimestamp);

        let printRequestVO: PrintRequestVO = new PrintRequestVO();
        printRequestVO.schoolYearId = this.sessionDataService.userPreference.schoolYear.id;
        printRequestVO.fromTimestamp = this.fromTimestamp;
        printRequestVO.toTimestamp = new Date(this.toTimestamp.getFullYear(), this.toTimestamp.getMonth(), this.toTimestamp.getDate(), 23, 59, 59, 999);

        this.studentService.downloadStudentsByTimestampRangePdf(printRequestVO).subscribe(
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
        let printRequestVO: PrintRequestVO = new PrintRequestVO();
        printRequestVO.schoolYearId = this.sessionDataService.userPreference.schoolYear.id;
        printRequestVO.studentIds = studentIds;

        this.studentService.downloadStudentsByStudentIdsPdf(printRequestVO).subscribe(
            (response) => {
                var pdfUrl = URL.createObjectURL(response);
                window.open(pdfUrl);
            }
        );
    }

    onCancel() {
        this.router.navigate(['/studentTable']);
    }
}