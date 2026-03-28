import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
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
  description: string;
}
