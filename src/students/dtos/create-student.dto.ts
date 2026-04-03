import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsOptional()
  age: number;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  address: string;

  @IsPhoneNumber('IN', { message: 'Please Enter Indian Phone Number' })
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description?: string;
}
