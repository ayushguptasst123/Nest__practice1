import { Expose, Transform } from 'class-transformer';
import { Student, StudentRole } from '../entity/student.entity';

export class StudentDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }: { obj: Student }) => {
    return `${obj.firstName} ${obj.lastName}`;
  })
  name: string;

  @Expose()
  address: string;

  @Expose()
  role: StudentRole;

  @Expose()
  dateOfBirth: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  description: string;

  // This property didn't exists in db and nest don't give error.
  // It just ignore it
  @Expose()
  descriptionAgain: string;
}
