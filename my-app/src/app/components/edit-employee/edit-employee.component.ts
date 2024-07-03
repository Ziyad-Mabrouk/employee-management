import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {

  @Input() employee?: Employee;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phone: string = "";

  @Output() employeesUpdated = new EventEmitter<Employee[]>();


  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  /*
  deleteEmployee(id: number) {
    this.employee = new Employee();
    this.employeeService.deleteEmployee(id)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
  }
  */
  updateEmployee(employee: Employee) {
    this.employee = new Employee();
    this.employeeService.updateEmployee(employee)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
  }
  createEmployee(employee: Employee) {
    this.employee = new Employee();
    this.employeeService.createEmployee(employee)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
  }
}
