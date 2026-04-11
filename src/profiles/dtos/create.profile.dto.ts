import { IsBoolean, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}
