import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class StudentDto {
  // @IsUUID('4', { message: 'Give correct UUID' })
  // id: string;

  @IsNumber()
  @Max(100)
  @IsPositive()
  age: number;

  @IsString()
  name: string;

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
