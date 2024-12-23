import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities/Local Entities/employee.entity';
import { UpdateEmployeeDto } from './dtos/updateEmployee.dto';
import { getRepositoryForCompany } from 'src/utils/companyRepository.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async addEmployeeToCompany(
    createEmployeeDto: CreateEmployeeDto,
    companyId: number,
  ): Promise<Employee> {
    // Hash the password if provided
    if (createEmployeeDto.password) {
      const saltRounds = 10; // Adjust salt rounds based on your security needs
      createEmployeeDto.password = await bcrypt.hash(
        createEmployeeDto.password,
        saltRounds,
      );
    }

    // Get the repository for the company schema
    const employeeRepository = await getRepositoryForCompany(
      companyId,
      Employee,
    );

    // Create and save the employee entity
    const employee = employeeRepository.create(createEmployeeDto);
    return employeeRepository.save(employee);
  }

  async getEmployees(companyId: number): Promise<Employee[]> {
    // Get the repository for the company schema
    const employeeRepository = await getRepositoryForCompany(
      companyId,
      Employee,
    );
    // Find the employee by ID
    const employees = await employeeRepository.find();

    if (!employees) {
      throw new NotFoundException('Employee not found');
    }

    return employees;
  }

  async getEmployeeById(
    employeeId: number,
    companyId: number,
  ): Promise<Employee> {
    // Get the repository for the company schema
    const employeeRepository = await getRepositoryForCompany(
      companyId,
      Employee,
    );
    // Find the employee by ID
    const employee = await employeeRepository.findOne({
      where: { employee_id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async updateEmployee(
    employeeId: number,
    companyId: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    // Get the repository for the company schema
    const employeeRepository = await getRepositoryForCompany(
      companyId,
      Employee,
    );

    // Find the existing employee
    const existingEmployee = await employeeRepository.findOne({
      where: { employee_id: employeeId },
    });

    if (!existingEmployee) {
      throw new NotFoundException('Employee not found');
    }

    // Hash the password if provided
    if (updateEmployeeDto.password) {
      const saltRounds = 10;
      updateEmployeeDto.password = await bcrypt.hash(
        updateEmployeeDto.password,
        saltRounds,
      );
    }

    // Merge the updated data into the existing employee
    const updatedEmployee = employeeRepository.merge(
      existingEmployee,
      updateEmployeeDto,
    );

    // Save and return the updated employee
    return employeeRepository.save(updatedEmployee);
  }

  async deleteEmployee(employeeId: number, companyId: number): Promise<void> {
    // Get the repository for the company schema
    const employeeRepository = await getRepositoryForCompany(
      companyId,
      Employee,
    );

    // Find the employee
    const employee = await employeeRepository.findOne({
      where: { employee_id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    // Remove the employee
    await employeeRepository.remove(employee);
  }
}
