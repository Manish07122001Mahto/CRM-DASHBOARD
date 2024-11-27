import { IsString, IsNumber, IsOptional, IsUrl, IsDate } from 'class-validator';

export class CreateDealDto {
  @IsString()
  dealName: string;

  @IsNumber()
  dealValue: number;

  @IsString()
  stages: string;

  @IsDate()
  expectedCloseDate: Date;

  @IsNumber()
  @IsOptional()
  probability?: number;

  @IsUrl({}, { message: 'Invalid URL format.' })
  @IsOptional()
  proposalLink?: string;

  @IsString()
  @IsOptional()
  contracts?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

import { PartialType } from '@nestjs/mapped-types';
export class UpdateDealDto extends PartialType(CreateDealDto) {}
