import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Session,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { StudentAuthDto } from './dtos/student-auth.dto';
import { AuthService } from './auth.service';
import { CreateStudentDto } from 'src/students/dtos/create-student.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentDto } from 'src/students/dtos/student.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student, StudentRole } from 'src/students/entity/student.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CaptainGuard } from 'src/guards/captain.guard';
import { Public } from 'src/decorator/public.decorator';

export interface StudentSession {
  studentId?: string;
  studentRole?: StudentRole;
}

@Controller('auth')
@Serialize(StudentDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Public()
  async signUp(@Body() student: CreateStudentDto) {
    const savedStudent = await this.authService.signUp(student);
    return savedStudent;
  }

  @Post('/signin')
  @SetMetadata('isPublic', true) //Reflector(present in guard) read this
  @HttpCode(200)
  async signIn(
    @Body() studentAuth: StudentAuthDto,
    @Session() currentStudent: StudentSession,
  ) {
    const student = await this.authService.signIn(
      studentAuth.email,
      studentAuth.password,
    );
    console.log(student);
    currentStudent.studentId = student.id;
    currentStudent.studentRole = student.role;
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
    session.studentRole = undefined;
  }

  // ************************************
  // Change the role of student
  // ************************************

  @UseGuards(CaptainGuard)
  @Get('/change-role/:id')
  changeStudentRole(@Param('id') id: string, @Query('role') role: string) {
    return this.authService.changeRole(id, role);
  }
}
