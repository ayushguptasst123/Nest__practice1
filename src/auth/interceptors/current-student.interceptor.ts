import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Student } from '../../students/entities/student.entity';
import { UUID } from 'crypto';
import { StudentService } from '../../students/students.service';
import { Request } from 'express';

interface CustomRequest extends Request {
  currentStudent?: Student;
}

@Injectable()
export class CurrentStudentInterceptor implements NestInterceptor {
  constructor(private studentService: StudentService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    const studentId = (request.session as { studentId?: UUID })?.studentId;
    console.log(studentId);
    if (studentId) {
      const student = await this.studentService.findById(studentId);
      request.currentStudent = student;
    }

    return next.handle();
  }
}
