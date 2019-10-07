import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_METADATA_KEY } from '../constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user;
    const roles =
      this.reflector.get<string[]>(ROLES_METADATA_KEY, context.getHandler()) ||
      [];

    roles.forEach(role => {
      if (!user[role]) {
        throw new ForbiddenException();
      }
    });

    return true;
  }
}
