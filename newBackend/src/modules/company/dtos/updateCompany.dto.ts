// DTO for updating a contact
import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './createCompany.dto';

// PartialType automatically makes all fields from CreateCompanyDto optional.
export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}