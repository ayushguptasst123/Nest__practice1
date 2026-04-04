import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { StudentModule } from '../students/students.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [StudentModule],
})
export class AuthModule {}
