import { Routes, RouterModule } from '@angular/router';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentDetailsFormComponent } from './student-details-form/student-details-form.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteDetailsFormComponent } from './note-details-form/note-details-form.component';
import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',              component: StudentTableComponent},
    {path: 'studentTable',  component: StudentTableComponent},
    {path: 'studentDetails',  component: StudentDetailsComponent},
    {path: 'studentDetailsForm',  component: StudentDetailsFormComponent},
    {path: 'noteTable', component: NoteTableComponent},
    {path: 'noteDetails',  component: NoteDetailsComponent},
    {path: 'noteDetailsForm',  component: NoteDetailsFormComponent},
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);