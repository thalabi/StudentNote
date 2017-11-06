import { Component, OnInit } from '@angular/core';
import { Student } from '../domain/Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { MessageService } from 'app/error/message.service';
import { Note } from 'app/domain/Note';

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.css']
})
export class NoteTableComponent implements OnInit {

  student: Student;
  selectedRowIndex : number;
  selectedNote: Note;
  modifyAndDeleteButtonsDisable : boolean = true;

  constructor(
    private studentService: StudentService,
    private sessionDataService: SessionDataService,    
    private router: Router,
    private messageService: MessageService) {

    console.log('NoteTableComponent constructor ...');
  }

  ngOnInit() {
    this.messageService.clear();
    
    console.log('NoteTableComponent ngOnInit() begin ...');
    this.student = this.sessionDataService.student;
    console.log('this.student: ', this.student);
    console.log('NoteTableComponent ngOnInit() end ...');
  }


  onRowSelect(event) {
    console.log(this.selectedNote);
    this.modifyAndDeleteButtonsDisable = false;
    console.log(this.modifyAndDeleteButtonsDisable);

    this.selectedRowIndex = this.student.noteSet.indexOf(this.selectedNote);
    console.log('this.selectedRowIndex', this.selectedRowIndex);
  }

  onRowUnselect(event) {
    console.log(this.selectedNote);
    this.modifyAndDeleteButtonsDisable = true;
    console.log(this.modifyAndDeleteButtonsDisable);
  }

  onAddNote () {
    this.sessionDataService.crudMode = 'Add';
    this.router.navigate(['/noteDetailsForm']);
  }

  onModifyNote () {
    this.sessionDataService.crudMode = 'Modify';
    this.sessionDataService.noteListIndex = this.selectedRowIndex;
    this.router.navigate(['/noteDetailsForm']);    
  }

  onDeleteNote () {
    this.sessionDataService.crudMode = 'Delete';
    this.sessionDataService.noteListIndex = this.selectedRowIndex;
    this.router.navigate(['/noteDetailsForm']);    
  }
}
