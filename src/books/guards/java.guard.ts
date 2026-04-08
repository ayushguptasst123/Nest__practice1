import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class JavaGuards implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.session || request.session.bookName !== 'admin') return false;
    return true;
  }
}
