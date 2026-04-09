import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateLibraryCardDto {
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
