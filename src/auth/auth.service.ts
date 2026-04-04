import { BadRequestException, Injectable } from '@nestjs/common';
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

    student.password = salt + '.' + hash.toString('hex');

    /*
    Is it a good approach to hand over the student dto obj to student service 
    or we have to handle it here
    */
    return await this.studentService.save(student);
  }

  signIn(email: string, password: string) {
    console.log(email, password);
    return { email, password };
  }
}
