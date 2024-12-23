import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsPositive,
  IsUrl,
} from 'class-validator';

export class CreateDealDto {
  @IsString()
  dealName: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  dealValue: number;

  @IsString()
  stages: string;

  @IsDate()
  @Type(() => Date) // This ensures transformation from string to Date
  expectedCloseDate: Date;

  @IsNumber()
  @IsOptional()
  probability?: number;

  @IsUrl()
  @IsOptional()
  proposalLink?: string;

  @IsString()
  @IsOptional()
  contracts?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
