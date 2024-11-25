import { IsString, IsEmail, IsOptional, IsUrl } from 'class-validator';

export class CreateContactDto {
  @IsString()
  company: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsString()
  poc: string; // Point of Contact

  @IsString()
  phone: string;

  @IsUrl({}, { message: 'Invalid URL format.' })
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  services?: string;

  @IsString()
  @IsOptional()
  assignee?: string;

  @IsString()
  @IsOptional()
  note?: string;
}

// DTO for updating a contact
import { PartialType } from '@nestjs/mapped-types';

// PartialType automatically makes all fields from CreateContactDto optional.
export class UpdateContactDto extends PartialType(CreateContactDto) {}
