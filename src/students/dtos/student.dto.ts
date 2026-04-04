import { Expose, Transform } from 'class-transformer';
import { Student } from '../entities/student.entity';

export class StudentDto {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }: { obj: Student }) => {
    const dobYear = obj.dateOfBirth.getFullYear();
    const currYear = new Date().getFullYear();
    return currYear - dobYear;
  })
  age: Date;

  @Expose()
  @Transform(({ obj }: { obj: Student }) => {
    return `${obj.firstName} ${obj.lastName}`;
  })
  name: string;

  @Expose()
  address: string;

  @Expose()
  dateOfBirth: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  description: string;

  // This property didn't exists and nest don't give error.
  // It just ignore it just like your crush
  @Expose()
  descriptionAgain: string;
}
