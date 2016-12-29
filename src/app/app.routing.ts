import { Routes, RouterModule } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',              component: Component1Component},
    {path: 'component1',    component: Component1Component},
    {path: 'component2',    component: Component2Component},
    {path: 'studentTable',  component: StudentTableComponent},
    {path: 'studentDetails/:id',  component: StudentDetailsComponent},
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);