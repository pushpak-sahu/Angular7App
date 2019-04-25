import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee-service.service';
import { EmployeeModel } from '../shared/employee-model';
import { filter, timeout } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeModel[] = [];
  searchEmployee: EmployeeModel[] = [];
  _searchFilter = '';
  errorMessage: string;

  get searchFilter(): string {
    return this._searchFilter;
  }
  set searchFilter(value: string) {
    this._searchFilter = value;
    this.searchEmployee = this.searchFilter ? this.performSearch(this.searchFilter) : this.employees;
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmp();
  }

  performSearch(filterBy: string): EmployeeModel[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.employees.filter(
      (product: EmployeeModel) =>
      product.FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  getEmp() {
    this.employeeService.getEmployees().pipe(
      timeout(1000)
    )
    .subscribe(
      (employees: EmployeeModel[]) => {
        this.employees = employees;
        this.searchEmployee = this.employees;
      },
      error => this.errorMessage = error as any
    );
  }
}
