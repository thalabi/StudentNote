import { Routes, RouterModule } from '@angular/router';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { NoteTableComponent } from './note-table/note-table.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',              component: StudentTableComponent},
    {path: 'studentTable',  component: StudentTableComponent},
    {path: 'studentDetails/:id/:crudMode',  component: StudentDetailsComponent},
    {path: 'noteTable/:id', component: NoteTableComponent},
    {path: 'noteDetails/:studentId/:noteId/:crudMode',  component: NoteDetailsComponent},
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);