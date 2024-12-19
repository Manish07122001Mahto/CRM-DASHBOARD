// DTO for updating a contact
import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './employee.dto';

// PartialType automatically makes all fields from CreateEmployeeDto optional.
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
