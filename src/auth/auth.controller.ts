import { Body, Controller, Post } from '@nestjs/common';
import { StudentAuthDto } from './dtos/student-auth.dto';
import { AuthService } from './auth.service';
import { CreateStudentDto } from 'src/students/dtos/create-student.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentDto } from 'src/students/dtos/student.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Serialize(StudentDto)
  @Post('/signup')
  signUp(@Body() student: CreateStudentDto) {
    return this.authService.signUp(student);
  }

  @Post('/signin')
  signIn(@Body() studentAuth: StudentAuthDto) {
    console.log(studentAuth);
    return this.authService.signIn(studentAuth.email, studentAuth.password);
  }
}
