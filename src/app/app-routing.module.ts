import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { ManageEmployeesComponent } from './employees/manage-employees/manage-employees.component';

const routes: Routes = [
  {
  path: 'home',
  component: EmployeeListComponent
},
{
  path: 'add',
  component: EmployeeComponent
},
{
  path: 'manage',
  component: ManageEmployeesComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
