import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import _ from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return false;
    return matchRoles(roles, user.roles);
  }
}

function matchRoles(roles, userRoles) {
  return _.intersection(roles, userRoles) ? true : false;
}
