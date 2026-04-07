import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { StudentAuthDto } from './dtos/student-auth.dto';
import { AuthService } from './auth.service';
import { CreateStudentDto } from 'src/students/dtos/create-student.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentDto } from 'src/students/dtos/student.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student } from 'src/students/entities/student.entity';
import { AuthGuard } from 'src/guards/auth.guard';

export interface StudentSession {
  studentId?: string;
}

@Controller('auth')
@Serialize(StudentDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() student: CreateStudentDto,
    @Session() session: StudentSession,
  ) {
    const savedStudent = await this.authService.signUp(student);
    session.studentId = savedStudent.id;
    return savedStudent;
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(
    @Body() studentAuth: StudentAuthDto,
    @Session() session: StudentSession,
  ) {
    const student = await this.authService.signIn(
      studentAuth.email,
      studentAuth.password,
    );
    session.studentId = student.id;
    return student;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentStudent() student: Student) {
    console.log(student);
    return student;
  }

  @Get('/signout')
  signOut(@Session() session: StudentSession) {
    session.studentId = undefined;
  }
}
