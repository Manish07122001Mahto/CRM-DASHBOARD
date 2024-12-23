// DTO for updating a deal
import { PartialType } from '@nestjs/mapped-types';
import { CreateDealDto } from './createDeal.dto';

// PartialType automatically makes all fields from CreateEmployeeDto optional.
export class UpdateDealDto extends PartialType(CreateDealDto) {}
