import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
      throw new NotFoundException(`Student with email ${email} not found`);

    const [salt, studentSavedPassword] = fetchedStudent.password.split('.');

    const hash = (await myScrypt(password, salt, 32)) as Buffer;

    if (studentSavedPassword !== hash.toString('hex'))
      throw new UnauthorizedException('Invalid email or password');

    return fetchedStudent;
  }

  async whoAmI(userId: string) {
    return await this.studentService.findById(userId);
  }
}
