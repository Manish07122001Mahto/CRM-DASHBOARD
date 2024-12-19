import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  Length,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 100)
  role: string;

  @IsString()
  @Length(1, 50)
  phone: string;

  @IsEmail()
  @Length(1, 255)
  email: string; //should unique

  @IsString()
  @Length(1, 255)
  password: string;

  @IsOptional()
  @IsDateString()
  dob?: string;
}
