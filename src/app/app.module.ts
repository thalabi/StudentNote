import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StudentService } from './student.service';
import { SessionDataService } from './session-data.service';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { AppRouting } from './app.routing';
import { StudentTableComponent } from './student-table/student-table.component'
import { _404Component } from './404.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { StudentDetailsFormComponent } from './student-details-form/student-details-form.component';
import { NoteDetailsFormComponent } from './note-details-form/note-details-form.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component'

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,
    StudentTableComponent,
    _404Component,
    NoteTableComponent,
    StudentDetailsFormComponent,
    NoteDetailsFormComponent,
    AboutComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [StudentService, SessionDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
