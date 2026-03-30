import { IsNegative, IsNumber, IsString, Max } from 'class-validator';

export class ProfessorDto {
  @IsNumber()
  @IsNegative()
  fullSpeed: number;

  @IsString()
  @Max(20)
  carName: string;
}
