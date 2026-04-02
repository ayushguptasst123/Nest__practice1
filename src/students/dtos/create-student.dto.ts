import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  password: string;

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
  @MaxLength(250)
  description: string;
}
