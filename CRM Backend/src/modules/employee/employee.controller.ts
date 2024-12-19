import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateEmployeeDto } from './dtos/employee.dto';
import { UpdateEmployeeDto } from './dtos/updateEmployee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add/:companyId')
  async addEmployee(
    @Param('companyId') companyId: number,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    return this.employeeService.addEmployeeToCompany(
      createEmployeeDto,
      companyId,
    );
  }

  @Get(':companyId/:employeeId')
  async getEmployee(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
  ) {
    return this.employeeService.getEmployeeById(employeeId, companyId);
  }

  // @Roles(Role.SUPERADMIN, Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update/:companyId/:employeeId')
  async updateEmployee(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(
      employeeId,
      companyId,
      updateEmployeeDto,
    );
  }

  // @Roles(Role.SUPERADMIN, Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:companyId/:employeeId')
  async deleteEmployee(
    @Param('companyId') companyId: number,
    @Param('employeeId') employeeId: number,
  ) {
    return this.employeeService.deleteEmployee(employeeId, companyId);
  }
}
