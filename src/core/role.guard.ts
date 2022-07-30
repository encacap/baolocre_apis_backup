import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/interfaces/enums';
import { UserDocument } from 'src/modules/user/user.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleEnum[]>(ROLE_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserDocument = request.user;
    const hasRole = () => roles.some((role) => user.roles.includes(role));
    if (user && hasRole()) {
      return true;
    }
    throw new ForbiddenException();
  }
}
