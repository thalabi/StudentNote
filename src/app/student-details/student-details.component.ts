import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor (private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("StudentDetailsComponent begin ...");
    console.log("id: " + this.activatedRoute.snapshot.params['id']);
    console.log("StudentDetailsComponent end ...");
  }

}
