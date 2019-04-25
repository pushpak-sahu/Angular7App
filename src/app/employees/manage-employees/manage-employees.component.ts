import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee-service.service';
import { EmployeeModel } from '../shared/employee-model';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css']
})
export class ManageEmployeesComponent implements OnInit {

  employees: EmployeeModel[] = [];

  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.getEmp();
  }

  getEmp() {
    this.employeeService.getEmployees()
      .subscribe(
        (employees: EmployeeModel[]) => {
          this.employees = employees;
        },
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?') === true) {
      this.employeeService.removeEmployee(id)
        .subscribe(x => {
          this.getEmp();
          this.toastr.success('Record Deleted', 'Success');
        });
    }
  }

}
