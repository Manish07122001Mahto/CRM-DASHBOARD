// DTO for updating a activity
import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './createActivity.dto';

// PartialType automatically makes all fields from CreateActivityDto optional.
export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
