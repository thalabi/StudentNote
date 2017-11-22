import { Component, OnInit } from '@angular/core';
import { Student } from '../dto/Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { MessageService } from './../error/message.service';

@Component({
    selector: 'app-student-table',
    templateUrl: './student-table.component.html',
    styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

    studentArray: Student[];

    selectedStudent: Student;
    modifyAndDeleteButtonsDisable: boolean = true;

    constructor(
        private studentService: StudentService,
        private sessionDataService: SessionDataService,
        private router: Router,
        private messageService: MessageService) {

        console.log('StudentTableComponent constructor ...');
    }

    ngOnInit() {
        console.log('StudentTableComponent ngOnInit() begin ...');

        this.messageService.clear();

        // let millisecondsToWait = 2000;
        // setTimeout(function() {
        //   console.log('Waiting 2000 milli seconds ...');
        // }, millisecondsToWait);
        this.studentService.getStudents().subscribe({
            next: students => {
                this.studentArray = students;
                console.log('studentArray[]: ', this.studentArray);
            },
            error: error => {
                console.error(error);
                this.messageService.clear();
                this.messageService.error(error);
            }
        });
        console.log('StudentTableComponent ngOnInit() end ...');
    }

    onRowSelect(event) {
        console.log(this.selectedStudent);
        this.modifyAndDeleteButtonsDisable = false;
        console.log(this.modifyAndDeleteButtonsDisable);
    }

    onRowUnselect(event) {
        console.log(this.selectedStudent);
        this.modifyAndDeleteButtonsDisable = true;
        console.log(this.modifyAndDeleteButtonsDisable);
    }

    onAddStudent() {
        this.sessionDataService.student = this.selectedStudent;
        this.sessionDataService.crudMode = 'Add';
        this.router.navigate(['/studentDetailsForm']);
    }
    onModifyStudent() {
        this.sessionDataService.student = this.selectedStudent;
        this.sessionDataService.crudMode = 'Modify';
        this.router.navigate(['/studentDetailsForm']);
    }
    onDeleteStudent() {
        this.sessionDataService.student = this.selectedStudent;
        this.sessionDataService.crudMode = 'Delete';
        this.router.navigate(['/studentDetailsForm']);
    }
    onManageNotes() {
        this.sessionDataService.student = this.selectedStudent;
        this.router.navigate(['/noteTable']);
    }
}
