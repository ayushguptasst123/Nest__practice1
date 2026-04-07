import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from '../students/students.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentStudentInterceptor } from './interceptors/current-student.interceptor';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentStudentInterceptor,
    },
  ],
  controllers: [AuthController],
  imports: [StudentModule],
})
export class AuthModule {}
