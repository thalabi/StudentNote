import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StudentService } from './student.service';
import { SessionDataService } from './session-data.service';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { AppRouting } from './app.routing';
import { StudentTableComponent } from './student-table/student-table.component'
import { _404Component } from './404.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { NoteDetailsComponent } from './note-details/note-details.component'

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,
    StudentTableComponent,
    _404Component,
    StudentDetailsComponent,
    NoteTableComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [StudentService, SessionDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
