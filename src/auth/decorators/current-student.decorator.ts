import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Student } from '../../students/entity/student.entity';
import { Request } from 'express';

interface CustomRequest extends Request {
  currentStudent: Student;
}

export const CurrentStudent = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    return request.currentStudent;
  },
);
