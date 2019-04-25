import { Injectable } from '@angular/core';
import { EmployeeModel } from './employee-model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: EmployeeModel;
  employees: EmployeeModel[];

  constructor(private http: HttpClient) { }

  postEmployee(emp: EmployeeModel) {
    const body = JSON.stringify(emp);
    const postUrl = 'http://localhost:50323/api/Employee';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(postUrl, body, httpOptions)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  getEmployees(): Observable<EmployeeModel[]> {
    const getUrl = 'http://localhost:50323/api/Employee';

    return this.http.get<EmployeeModel[]>(getUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  removeEmployee(id: number) {
    const deleteUrl = 'http://localhost:50323/api/Employee/';

    return this.http.delete(deleteUrl + id)
      .pipe(
        map((data: Response) => {
          return data;
        })
      );
  }

   handleError(error: HttpResponse<any>) {
    return throwError(error);
  }
}
