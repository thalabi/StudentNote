import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StudentService } from './student.service';
import { SessionDataService } from './session-data.service';
import { AppRouting } from './app.routing';
import { StudentTableComponent } from './student-table/student-table.component'
import { _404Component } from './404.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { StudentDetailsFormComponent } from './student-details-form/student-details-form.component';
import { NoteDetailsFormComponent } from './note-details-form/note-details-form.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component'

import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component'
import { AuthenticationService } from './security/authentication.service';
import { MenuComponent } from './menu/menu.component';
import { PrintComponent } from './print/print.component';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    _404Component,
    NoteTableComponent,
    StudentDetailsFormComponent,
    NoteDetailsFormComponent,
    AboutComponent,
    ContactUsComponent,
    StudentDashboardComponent,
    LoginComponent,
    MenuComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting,
    MaterialModule
  ],
  providers: [
    StudentService,
    SessionDataService,
    AuthGuard,
    AuthenticationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
