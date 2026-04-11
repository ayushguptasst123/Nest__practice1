import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFeedOnlyDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsPositive()
  views: number;
}
