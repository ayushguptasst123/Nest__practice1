import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Session,
} from '@nestjs/common';
import { StudentAuthDto } from './dtos/student-auth.dto';
import { AuthService } from './auth.service';
import { CreateStudentDto } from 'src/students/dtos/create-student.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentDto } from 'src/students/dtos/student.dto';

interface userSession {
  userId: string;
}

@Controller('auth')
@Serialize(StudentDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() student: CreateStudentDto,
    @Session() session: userSession,
  ) {
    const user = await this.authService.signUp(student);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() studentAuth: StudentAuthDto,
    @Session() session: userSession,
  ) {
    const user = await this.authService.signIn(
      studentAuth.email,
      studentAuth.password,
    );
    session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  async whoAmI(@Session() session: userSession) {
    if (!session.userId)
      throw new BadRequestException('Token expire please login again');
    return await this.authService.whoAmI(session.userId);
  }
}
