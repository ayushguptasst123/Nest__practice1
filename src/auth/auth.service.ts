import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
import { CreateStudentDto } from 'src/students/dtos/create-student.dto';
import { StudentService } from 'src/students/students.service';
import { promisify } from 'util';

const myScrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private studentService: StudentService) {}

  async signUp(student: CreateStudentDto) {
    // Fetch student is exists or not if not throw error
    const [fetchedStudent] = await this.studentService.findByEmail(
      student.email,
    );

    if (fetchedStudent) throw new BadRequestException('Email already in use');

    student['age'] =
      new Date().getFullYear() - student.dateOfBirth.getFullYear();

    const salt = randomBytes(8).toString('hex');

    const hash = (await myScrypt(student.password, salt, 32)) as Buffer;
    // Generate same hash is password is same
    // const hash = (await myScrypt(
    //   student.password,
    //   student.password,
    //   32,
    // )) as Buffer;

    student.password = salt + '.' + hash.toString('hex');

    return await this.studentService.save(student);
  }

  async signIn(email: string, password: string) {
    const [fetchedStudent] = await this.studentService.findByEmail(email);

    if (!fetchedStudent)
      throw new NotFoundException(`Student with email ${email} didn't exists`);

    const fetchedPassword = fetchedStudent.password;

    const [passwordSalt, storedHash] = fetchedPassword.split('.');

    const hashPassword = (await myScrypt(password, passwordSalt, 32)) as Buffer;

    console.log(hashPassword.toString('hex'));
    console.log(storedHash);

    if (hashPassword.toString('hex') !== storedHash)
      throw new BadRequestException('Incorrect Password');

    return fetchedStudent;
  }
}
