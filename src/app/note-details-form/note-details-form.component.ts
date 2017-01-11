import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../Student';
import { Note } from '../Note';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-details-form',
  templateUrl: './note-details-form.component.html',
  styleUrls: ['./note-details-form.component.css']
})
export class NoteDetailsFormComponent implements OnInit {

  noteForm : FormGroup;
  student: Student;
  note: Note;
  crudMode: string;
  datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private sessionDataService: SessionDataService,    
    private router: Router) { }

  ngOnInit() {
    this.crudMode = this.sessionDataService.crudMode;
    this.student = this.sessionDataService.student;
    if (this.crudMode == 'Add') {
      this.note = new Note();
      this.note.timestamp = new Date();
    } else {
      let noteSetIndex: number = this.sessionDataService.noteSetIndex;
      this.note = Object.assign({}, this.student.noteSet[noteSetIndex]);
    }

    this.noteForm = this.formBuilder.group({
      'timestamp' : [{value: this.datePipe.transform(this.note.timestamp, 'MMM dd, yyyy hh:mm a')  , disabled: this.crudMode == 'Delete'}],
      'text' : [{value: this.note.text, disabled: this.crudMode == 'Delete'}]
    })


    this.noteForm.valueChanges
      .subscribe(data => this.onValueChanged(data));  
  }

  onValueChanged(data?: any) {
    console.log('onValueChanged')
  }

  onSubmit() {
    this.note.timestamp = this.noteForm.get('timestamp').value;
    this.note.text = this.noteForm.get('text').value;
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
