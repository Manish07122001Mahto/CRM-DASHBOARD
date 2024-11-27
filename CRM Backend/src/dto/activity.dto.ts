import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @IsDateString()
  date: string;

  @IsString()
  activityType: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsDateString()
  @IsOptional()
  followUpDate?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;
}

// Update DTO
export class UpdateActivityDto extends PartialType(CreateActivityDto) {}
