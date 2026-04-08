import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { StudentRole } from 'src/students/entities/student.entity';

export class MonitorCaptainGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (
      !request.session ||
      request.session.studentRole === StudentRole.MONITOR ||
      request.session.studentRole === StudentRole.CAPTAIN
    )
      return true;
    return false;
  }
}
