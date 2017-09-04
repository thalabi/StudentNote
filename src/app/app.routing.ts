import { Routes, RouterModule } from '@angular/router';
import { StudentTableComponent } from './student-table/student-table.component';
import { PrintComponent } from './print/print.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentDetailsFormComponent } from './student-details-form/student-details-form.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { NoteDetailsFormComponent } from './note-details-form/note-details-form.component';
import { SchoolYearCrudComponent } from './school-year-crud/school-year-crud.component';

import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './security/auth.guard';

import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',              component: StudentTableComponent, canActivate: [AuthGuard]},
    {path: 'studentTable',  component: StudentTableComponent, canActivate: [AuthGuard]},
    {path: 'print',  component: PrintComponent, canActivate: [AuthGuard]},
    {path: 'about',  component: AboutComponent},
    {path: 'contact-us',  component: ContactUsComponent},
    {path: 'studentDetailsForm',  component: StudentDetailsFormComponent, canActivate: [AuthGuard]},
    {path: 'noteTable', component: NoteTableComponent, canActivate: [AuthGuard]},
    {path: 'noteDetailsForm',  component: NoteDetailsFormComponent, canActivate: [AuthGuard]},
    {path: 'schoolYearCrud',  component: SchoolYearCrudComponent, canActivate: [AuthGuard]},
    {path: 'login',  component: LoginComponent},
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);