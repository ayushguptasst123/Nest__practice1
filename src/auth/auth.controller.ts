import { Body, Controller, Post } from '@nestjs/common';
import { StudentAuthDto } from './dtos/student-auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() studentAuth: StudentAuthDto) {
    return this.authService.signIn(studentAuth.email, studentAuth.password);
  }

  @Post('/signin')
  signIn(@Body() studentAuth: StudentAuthDto) {
    return this.authService.signIn(studentAuth.email, studentAuth.password);
  }
}
