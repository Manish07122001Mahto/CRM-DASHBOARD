// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Employee } from './entities/employee.entity';
// import { CreateEmployeeDto } from './dtos/employee.dto';

// @Injectable()
// export class EmployeeService {
//   constructor(
//     @InjectRepository(Employee)
//     private readonly employeeRepository: Repository<Employee>,
//   ) {}

//   async addEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
//     const employee = this.employeeRepository.create(createEmployeeDto);
//     return this.employeeRepository.save(employee);
//   }
// }

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/employee.dto';
import { createCompanyDataSource } from 'src/config/dataSource.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities/Local Entities/employee.entity';
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
    // Step 1: Hash the password if provided
    if (createEmployeeDto.password) {
      const saltRounds = 10; // Adjust salt rounds based on your security needs
      createEmployeeDto.password = await bcrypt.hash(
        createEmployeeDto.password,
        saltRounds,
      );
    }

    // Step 2: Get the repository for the company schema
    const companyDataSource = await createCompanyDataSource(companyId);
    const employeeRepository = companyDataSource.getRepository(Employee);

    // Step 3: Create and save the employee entity
    const employee = employeeRepository.create(createEmployeeDto);
    return employeeRepository.save(employee);
  }
}
