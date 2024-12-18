import {
  Body,
  Controller,
  Post,
  Param,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dtos/employee.dto';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Roles(Role.SUPERADMIN, Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

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
}
