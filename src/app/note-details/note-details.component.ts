import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { Note } from '../Note';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  student: Student;
  note: Note;
  crudMode: string;
  okButtonsDisable: boolean = false;

  constructor(
    private studentService: StudentService,
    private sessionDataService: SessionDataService,    
    private router: Router) { }

  ngOnInit() {
    //console.log(JSON.stringify(this.sessionDataService));
    this.crudMode = this.sessionDataService.crudMode;
    this.student = this.sessionDataService.student;
    if (this.crudMode == 'Add') {
      this.note = new Note();
      this.note.timestamp = new Date();
    } else {
      let noteSetIndex: number = this.sessionDataService.noteSetIndex;
      this.note = Object.assign({}, this.student.noteSet[noteSetIndex]);
    }
  }

  onSubmit() {
    switch (this.crudMode) {
      case 'Add':
        this.studentService.saveNote(this.student, this.note);
        break;
      case 'Modify':
        this.studentService.saveNote(this.student, this.note);
        break;
      case 'Delete':
        this.studentService.deleteNote(this.student, this.note);
        break;
      default:
        console.error('this.crudMode is invalid. this.crudMode: ' + this.crudMode);
    }
    this.router.navigate(['noteTable']);
  }
  
  onCancel() {
      this.router.navigate(['noteTable']);
  }

}
