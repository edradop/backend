import { AUTHORITY, IS_PUBLIC } from '@edd/config';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TUser } from '../module/user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const handlerAuthorities = this.reflector.get<string[]>(AUTHORITY, context.getHandler()) || [];
    const classAuthorities = this.reflector.get<string[]>(AUTHORITY, context.getClass()) || [];
    const authorities = [...handlerAuthorities, ...classAuthorities];
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as TUser;

    if (!authorities || !authorities.length) {
      return true;
    }
    const userAuthoritiesFromRoles = user.roles?.reduce((all: string[], role) => {
      return [...all, ...role.authorities];
    }, []);
    const userAuthorities = [...userAuthoritiesFromRoles, ...user.authorities];

    const hasRole = () =>
      userAuthorities.some(
        (authority: unknown) => !!authorities.find((item) => item === authority),
      );
    return user && userAuthorities && hasRole();
  }
}
