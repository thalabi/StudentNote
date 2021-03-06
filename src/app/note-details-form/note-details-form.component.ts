import { Component, OnInit } from '@angular/core';
import { Student } from '../dto/Student';
import { Note } from '../dto/Note';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { Constants } from '../constants';
import { MessageService } from './../error/message.service';
import { NoteRequestVo } from 'app/vo/NoteRequestVo';
import { DateUtils } from 'app/util/DateUtils';

@Component({
    selector: 'app-note-details-form',
    templateUrl: './note-details-form.component.html',
    styleUrls: ['./note-details-form.component.css']
})
export class NoteDetailsFormComponent implements OnInit {

    student: Student;
    note: Note;
    crudMode: string;
    timestampBlur: boolean;

    schoolYearStartDate: Date;
    schoolYearEndDate: Date;

    constructor(
        private studentService: StudentService,
        private sessionDataService: SessionDataService,
        private router: Router,
        private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.clear();
        this.crudMode = this.sessionDataService.crudMode;
        this.student = this.sessionDataService.student;

        this.schoolYearStartDate = new Date(this.sessionDataService.userPreference.schoolYear.startDate);
        this.schoolYearEndDate = new Date(this.sessionDataService.userPreference.schoolYear.endDate);

        if (this.crudMode == 'Add') {
            this.note = new Note();
            let now: Date = new Date();
            if (now >= this.schoolYearStartDate && now <= DateUtils.endOfDay(this.schoolYearEndDate)) {
                this.note.timestamp = now;
            } else {
                this.note.timestamp = this.schoolYearStartDate;
            }
        } else {
            let noteListIndex: number = this.sessionDataService.noteListIndex;
            this.note = Object.assign({}, this.student.noteSet[noteListIndex]);
            this.note.timestamp = new Date(this.note.timestamp);
        }
    }

    onSubmit() {
        console.log('this.note', this.note);
        let noteRequestVo: NoteRequestVo = new NoteRequestVo;
        noteRequestVo.studentId = this.student.id;
        noteRequestVo.studentVersion = this.student.version;
        noteRequestVo.noteDto = this.note;
        console.log('noteReuestVo', noteRequestVo);
        switch (this.crudMode) {
            case 'Add':
                this.studentService.addNote(noteRequestVo)
                    .subscribe({
                        next: noteRequestVo => {
                            this.student.noteSet.push(noteRequestVo.noteDto);
                            this.sortNoteSet(this.student.noteSet);
                            this.student.version = noteRequestVo.studentVersion;
                            this.sessionDataService.student = this.student;
                            console.log('from subscribe 1 student: ', this.student);
                        },
                        error: error => {
                            console.error(error);
                            this.messageService.error(error);
                        },
                        complete: () => {
                            this.router.navigate(['noteTable']);
                        }
                    });
                console.log('after addNote()');

                break;
            case 'Modify':
                this.studentService.updateNote(noteRequestVo)
                    .subscribe({
                        next: noteRequestVo => {
                            let note = noteRequestVo.noteDto;
                            this.student.noteSet[this.sessionDataService.noteListIndex] = note;
                            this.sortNoteSet(this.student.noteSet);
                            this.sessionDataService.student = this.student;
                            console.log('from subscribe 1 student: ', this.student);
                        },
                        error: error => {
                            console.error(error);
                            this.messageService.error(error);
                        },
                        complete: () => {
                            this.router.navigate(['noteTable']);
                        }
                    });
                console.log('after updateNote()');

                break;
            case 'Delete':
                this.studentService.deleteNote(noteRequestVo)
                    .subscribe({
                        next: noteRequestVo => {
                            this.student.version = noteRequestVo.studentVersion;
                            this.sessionDataService.student = this.student;
                            this.student.noteSet.splice(this.sessionDataService.noteListIndex, 1);
                            console.log('from subscribe 1 student: ', this.student);
                        },
                        error: error => {
                            console.error(error);
                            this.messageService.error(error);
                        },
                        complete: () => {
                            this.router.navigate(['noteTable']);
                        }
                    });
                console.log('after deleteNote()');
                break;
            default:
                console.error('this.crudMode is invalid. this.crudMode: ' + this.crudMode);
        }
    }

    onCancel() {
        this.router.navigate(['noteTable']);
    }

    sortNoteSet(noteSet: Note[]): void {
        noteSet.sort((leftSide, rightSide): number => {
            if (leftSide.timestamp < rightSide.timestamp) return -1;
            if (leftSide.timestamp > rightSide.timestamp) return 1;
            return 0;
        });
    }

    // endOfDay(inputDate: Date): Date {
    //   let result: Date = inputDate;
    //   result.setHours(23,59,59,9999);
    //   return result;
    // }
}
