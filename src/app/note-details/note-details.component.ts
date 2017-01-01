import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { Note } from '../Note';
import { StudentService } from '../student.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.crudMode = this.activatedRoute.snapshot.params['crudMode'];
    if (this.crudMode == 'Add') {
      this.note = new Note();
    } else {
      this.student = this.studentService.getStudentById(this.activatedRoute.snapshot.params['studentId']);
      this.note = this.studentService.getNoteById(this.student.id, this.activatedRoute.snapshot.params['noteId'])
    }
  }

}
