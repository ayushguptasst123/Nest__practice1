import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { StudentRole } from 'src/students/entity/student.entity';

export class CaptainGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.session || request.session.studentRole !== StudentRole.CAPTAIN)
      return false;
    return true;
  }
}
