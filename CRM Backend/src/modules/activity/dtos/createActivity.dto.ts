import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @Length(1, 50)
  activityType: string;

  @IsDate()
  @Type(() => Date) // This ensures transformation from string to Date
  date: Date;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  followUpDate?: Date;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  assignedTo?: string;
}
