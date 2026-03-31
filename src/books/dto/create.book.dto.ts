import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export enum Genre {
  'FANTASY',
  'ROMANCE',
  'MYSTERY',
  'CRIME',
  'HORROR',
  'ADULT',
}

export class createBookDto {
  @IsString()
  @MaxLength(100)
  bookName: string;

  @IsString()
  @MaxLength(50)
  authorName: string;

  @IsString()
  @MaxLength(50)
  genre: Genre;

  @IsNumber()
  @IsPositive()
  totalPage: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
