import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';

@Component({
  selector: 'app-datatable-scrollable',
  templateUrl: './datatable-scrollable.component.html',
  styleUrls: ['./datatable-scrollable.component.css']
})
export class DatatableScrollableComponent implements OnInit {

  schoolYears: SchoolYear[];
  
  constructor() { }

  ngOnInit() {
    this.schoolYears = [
      {id: 1, schoolYear: '2015-2016', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 2, schoolYear: '2016-2017', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 3, schoolYear: '2017-2018', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 1, schoolYear: '2015-2016', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 2, schoolYear: '2016-2017', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 3, schoolYear: '2017-2018', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 1, schoolYear: '2015-2016', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 2, schoolYear: '2016-2017', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 3, schoolYear: '2017-2018', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []}
    ];
  }

}
