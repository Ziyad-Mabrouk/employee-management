import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environements/environement';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  public getEmployees() : Observable<Employee[]> {
    let url = "Employee/all";
    return this.http.get<Employee[]>(`${environment.apiURL}/${url}`);
  }

  public createEmployee(employee: Employee) : Observable<Employee[]> {
    let url = "Employee/add";
    return this.http.post<Employee[]>(`${environment.apiURL}/${url}`, employee);
  }

  public updateEmployee(employee: Employee) : Observable<Employee[]> {
    let url = "Employee/update";
    return this.http.put<Employee[]>(`${environment.apiURL}/${url}`, employee);
  }

  public deleteEmployee(id: number) : Observable<Employee[]> {
    let url = "Employee/delete";
    return this.http.delete<Employee[]>(`${environment.apiURL}/${url}/${id}`);
  }
}
