import { Component, OnInit } from '@angular/core';
import { Student } from './Student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor () {}

  ngOnInit() {
  }
}
