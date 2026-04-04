import { Expose } from 'class-transformer';

export class StudentDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  dateOfBirth: Date;

  @Expose()
  address: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  email: string;

  @Expose()
  description: string;
}
