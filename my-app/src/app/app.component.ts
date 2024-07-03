import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [EmployeeService], // Provide EmployeeService
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, HttpClientModule, RouterOutlet, EditEmployeeComponent, FormsModule]
})
export class AppComponent implements OnInit {
addEmployee(employeeToAdd: Employee) {
  this.employeeService.createEmployee(employeeToAdd)
  .subscribe((employees: Employee[]) => {this.employees = employees;});
  this.employeeToAdd = new Employee();
}

deleteEmployee(id: number|undefined) {
  this.employeeService.deleteEmployee(id as number)
  .subscribe((employees: Employee[]) => {this.employees = employees;});
}

updateEmployeeList(employees: Employee[]) {
  this.employees = employees;
}

initNewEmployee() {
  this.selectedEmployee = new Employee();
}

editEmployee(employee: Employee) {
  window.scrollTo(0, document.body.scrollHeight);
  this.selectedEmployee = employee;
}
  title = 'my-app';
  employees: Employee[] = [];
  selectedEmployee?: Employee;
  employeeToAdd: Employee = new Employee();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(result => {
      this.employees = result;
    });
  }
}
