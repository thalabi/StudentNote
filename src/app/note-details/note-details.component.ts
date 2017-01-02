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
    } else {
      let noteSetIndex: number = this.sessionDataService.noteSetIndex;
      this.note = this.student.noteSet[noteSetIndex];
    }
  }

  onSubmit() {
  }
  
  onCancel() {
      this.router.navigate(['noteTable']);
  }

}
