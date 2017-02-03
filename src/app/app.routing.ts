import { Routes, RouterModule } from '@angular/router';
import { StudentTableComponent } from './student-table/student-table.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { StudentDetailsFormComponent } from './student-details-form/student-details-form.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { NoteDetailsFormComponent } from './note-details-form/note-details-form.component';
import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',              component: StudentTableComponent},
    {path: 'studentTable',  component: StudentTableComponent},
    {path: 'about',  component: AboutComponent},
    {path: 'contact-us',  component: ContactUsComponent},
    {path: 'studentDetailsForm',  component: StudentDetailsFormComponent},
    {path: 'noteTable', component: NoteTableComponent},
    {path: 'noteDetailsForm',  component: NoteDetailsFormComponent},
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);