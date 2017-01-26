import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../Student';
import { Note } from '../Note';
import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Constants } from '../constants';

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
  // timestampBlur: boolean;

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
      let noteListIndex: number = this.sessionDataService.noteListIndex;
      this.note = Object.assign({}, this.student.noteList[noteListIndex]);
    }

    this.noteForm = this.formBuilder.group({
      'timestamp' : [{value: this.datePipe.transform(this.note.timestamp, 'MMM dd, yyyy hh:mm a'), disabled: this.crudMode == 'Delete'},
                      dateValidator],
      'text' : [{value: this.note.text, disabled: this.crudMode == 'Delete'}]
    })

    this.noteForm.valueChanges
      .subscribe(data => this.onValueChanged(data));  
  }

  onValueChanged(data?: any) {
/*
    const timestampControl = this.noteForm.get('timestamp');
    console.log('onValueChanged(), timestampControl: ', timestampControl);
    if (timestampControl.valid) {
      const timestampString = timestampControl.value;
      const matches = timestampString.match(Constants.TIMESTAMP_PATTERN);
      console.log('onValueChanged(), matches: ', matches);
      console.log('onValueChanged(), indexOf: ', Constants.MONTHS.indexOf(matches[1].toLowerCase()));
      const [year, monthIndex, day, hour, minute] = [matches[3], Constants.MONTHS.indexOf(matches[1].toLowerCase()), matches[2], +matches[4] + (matches[6].toLowerCase() == 'pm' ? 12 : 0), matches[5]];
      const timestamp = new Date(year, monthIndex, day, hour, minute, 0, 0);
      console.log('onValueChanged(), timestamp: ', timestamp);
    }
*/    
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
function dateValidator(control: FormControl): {[key: string]: any} {
  const timestamp = control.value;
  const patternValid = Constants.TIMESTAMP_PATTERN.test(timestamp);
  // console.log('dateValidator(), patternValid: ', patternValid);
  const matches = timestamp.match(Constants.TIMESTAMP_PATTERN);
  // console.log('dateValidator(), matches: ', matches);
  let timestampValid = true;
  if (matches) {
    let [year, monthIndex, day, hour, minute] = [matches[3], Constants.MONTHS.indexOf(matches[1].toLowerCase()), matches[2], +matches[4] + (matches[6].toLowerCase() == 'pm' ? 12 : 0), matches[5]];
    // console.log('dateValidator(), time components: ', year, monthIndex, day, hour, minute);
    if (monthIndex == -1 || day > 31 || hour > 23 || minute > 60) {
      timestampValid = false;
    } else if ([1,3,5,7,8,10,12].indexOf(monthIndex+1) == -1 && day == 31) {
      timestampValid = false;
    } else if (monthIndex+1 == 2) {
        if (((year % 4 == 0 && year % 100) || year % 400 == 0) && day == 29) {
            timestampValid = true;
        } else if (day > 28) {
            timestampValid = false;
        }
    }
    console.log('dateValidator(), timestampValid: ', timestampValid);
  }
  
  return matches && timestampValid ? null : {invalidDate: true};
}
