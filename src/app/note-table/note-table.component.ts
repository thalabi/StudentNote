import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    console.log('NoteTableComponent constructor ...');
  }

  ngOnInit() {
    console.log('NoteTableComponent ngOnInit() begin ...');
    this.student = this.studentService.getStudentById(this.activatedRoute.snapshot.params['id']);
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
    this.router.navigate(['/noteDetails', '', '', 'Add']);
  }

  onModifyNote () {
    this.router.navigate(['/noteDetails', this.student.id, this.student.noteSet[this.selectedRowIndex].id, 'Modify']);    
  }

  onDeleteNote () {
    
  }
}
