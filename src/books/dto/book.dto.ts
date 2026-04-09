import { Expose, Type } from 'class-transformer';
import { BookCondition, Subject } from './create.book.dto';
import { StudentDto } from '../../students/dtos/student.dto';

export class BookDto {
  @Expose()
  Id: string;

  @Expose()
  bookName: string;

  @Expose()
  authorName: string;

  @Expose()
  publishYear: number;

  @Expose()
  condition: BookCondition;

  @Expose()
  subject: Subject;

  @Expose()
  bookDescription?: string;

  @Expose()
  @Type(() => StudentDto)
  student: StudentDto;
}
