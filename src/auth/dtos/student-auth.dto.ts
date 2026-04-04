import { IsEmail, IsString } from 'class-validator';

export class StudentAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
