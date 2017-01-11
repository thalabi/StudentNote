import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-table',
  templateUrl: './note-table.component.html',
  styleUrls: ['./note-table.component.css']
})
export class NoteTableComponent implements OnInit {

  student: Student;
  selectedRowIndex : number;
  modifyAndDeleteButtonsDisable : boolean = true;

  constructor(
    private studentService: StudentService,
    private sessionDataService: SessionDataService,    
    private router: Router) {

    console.log('NoteTableComponent constructor ...');
  }

  ngOnInit() {
    console.log('NoteTableComponent ngOnInit() begin ...');
    this.student = this.sessionDataService.student;
    console.log('NoteTableComponent ngOnInit() end ...');
  }

  rowOnClick (selectedRowIndex: number) {
    if (selectedRowIndex != this.selectedRowIndex) {
      this.selectedRowIndex = selectedRowIndex;
      this.modifyAndDeleteButtonsDisable = false;
    } else {
      this.selectedRowIndex = -1;
      this.modifyAndDeleteButtonsDisable = true;
    }
  }

  onAddNote () {
    this.sessionDataService.crudMode = 'Add';
    this.router.navigate(['/noteDetailsForm']);
  }

  onModifyNote () {
    this.sessionDataService.crudMode = 'Modify';
    this.sessionDataService.noteSetIndex = this.selectedRowIndex;
    this.router.navigate(['/noteDetailsForm']);    
  }

  onDeleteNote () {
    this.sessionDataService.crudMode = 'Delete';
    this.sessionDataService.noteSetIndex = this.selectedRowIndex;
    this.router.navigate(['/noteDetailsForm']);    
  }
}
