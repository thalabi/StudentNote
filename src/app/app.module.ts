import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component'
import { AuthenticationService } from './security/authentication.service';
import { MenuComponent } from './menu/menu.component';
import { PrintComponent } from './print/print.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './app.error.handler';

import { MessageService } from './error/message.service';
import { CustomErrorHandler } from './error/custom-error-handler';
import { ExceptionComponent } from './error/error.component';
import { ConfigService, configServiceLoadConfig } from './config/config.service';

import {
    InputTextModule, DataTableModule, ButtonModule, DialogModule, TabViewModule, CheckboxModule,
    CalendarModule, DropdownModule, PickListModule, InputTextareaModule, ConfirmDialogModule, ConfirmationService,
    MenubarModule, PasswordModule, SharedModule
} from 'primeng/primeng';
import { SchoolYearCrudComponent } from './school-year-crud/school-year-crud.component';
import { SchoolYearSelectComponent } from './school-year-select/school-year-select.component';
import { SchoolYearStudentsComponent } from './school-year-students/school-year-students.component';

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
        LoginComponent,
        MenuComponent,
        PrintComponent,
        ExceptionComponent,
        SchoolYearCrudComponent,
        SchoolYearSelectComponent,
        SchoolYearStudentsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRouting,
        NgbModule.forRoot(),
        InputTextModule, DataTableModule, ButtonModule, DialogModule, TabViewModule, CheckboxModule,
        CalendarModule, DropdownModule, PickListModule, InputTextareaModule, ConfirmDialogModule,
        MenubarModule, PasswordModule, SharedModule
    ],
    providers: [
        StudentService,
        SessionDataService,
        AuthGuard,
        AuthenticationService,
        { provide: ErrorHandler, useClass: AppErrorHandler },
        MessageService, // added
        { provide: ErrorHandler, useClass: CustomErrorHandler }, // overrride default error handler
        ConfigService,
        { provide: APP_INITIALIZER, useFactory: configServiceLoadConfig, deps: [ConfigService], multi: true },
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
