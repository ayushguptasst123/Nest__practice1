import { Expose, Type } from 'class-transformer';
import { StudentDto } from 'src/students/dtos/student.dto';

export class LibraryCardDto {
  @Expose()
  cardNumber: string;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => StudentDto)
  student: StudentDto;
}
