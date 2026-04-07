import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class RestrictGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.session || !request.session.bookName) return false;
    return true;
  }
}
