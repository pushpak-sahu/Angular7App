import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  firstName: string = 'First Name';
  lastName: string = 'Last Name';
  businessTitle: string = 'Business Title';
  organization: string = 'Organization';
  email: string = 'Email';
  address: string = 'Address';
  city: string = 'City';
  state: string = 'State';
  zip: string = 'Zip';
  age: string = 'Age';
  interests: string = 'Interests';
  submit: string = 'Submit';
  refresh: string = 'Refresh';

  constructor(private employeeService: EmployeeService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    this.employeeService.postEmployee(form.value)
     .subscribe(data => {
      this.resetForm(form);
      this.toastr.success('Record Added', 'Success');
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }

    this.employeeService.selectedEmployee = {
        Id: null,
        FirstName: '',
        LastName: '',
        BusinessTitle: '',
        Organization: '',
        Email: '',
        Address: '',
        City: '',
        State: '',
        Zip: null,
        Age: null,
        Interests: ''
      };
  }

}
