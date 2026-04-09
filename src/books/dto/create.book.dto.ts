import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export enum Subject {
  /*
  'FANTASY',
  'ROMANCE',
  'MYSTERY',
  'CRIME',
  'HORROR',
  'ADULT',
  */
  MATH = 'math',
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  ENGLISH = 'english',
  HINDI = 'hindi',
  COMPUTER = 'computer',
}

export enum BookCondition {
  NEW = 'new',
  LIKE_NEW = 'liked_new',
  USED = 'used',
  DAMAGED = 'damaged',
}

export class createBookDto {
  @IsString()
  @MaxLength(100)
  bookName: string;

  @IsString()
  @MaxLength(50)
  authorName: string;

  @IsEnum(BookCondition)
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  condition: BookCondition;

  @IsEnum(Subject)
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  subject: Subject;

  @IsNumber()
  @Min(1990, { message: `We can't accept book before 1990` })
  @Max(2040, { message: `We can't Accept future books` })
  publishYear: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
