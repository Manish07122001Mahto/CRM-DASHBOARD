import {
  IsString,
  IsEmail,
  IsOptional,
  IsUrl,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Length(1, 255)
  companyName: string;

  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsPhoneNumber(null)
  phone: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  location?: string;

  @IsOptional()
  @IsUrl()
  companyLogoUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  additionalInfo?: Record<string, any>;
}
