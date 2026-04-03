import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  @MaxLength(20)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  lastName?: string;

  @IsStrongPassword({
    minSymbols: 0,
  })
  @IsOptional()
  @MaxLength(30)
  @MinLength(6)
  password?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfBirth2: Date;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  address123: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(250)
  description?: string;
}
