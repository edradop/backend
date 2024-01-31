import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TUser } from '../module/user';
import { AUTHORITY } from '@edd/config';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const handlerAuthorities = this.reflector.get<string[]>(AUTHORITY, context.getHandler()) || [];
    const classAuthorities = this.reflector.get<string[]>(AUTHORITY, context.getClass()) || [];
    const authorities = [...handlerAuthorities, ...classAuthorities];

    const request = context.switchToHttp().getRequest();
    const user = request.user as TUser;
    console.log('user', user);
    if (!authorities || !authorities.length) {
      return true;
    }
    const userAuthoritiesInRoles = user.roles?.reduce((all: string[], role) => {
      return [...all, ...role.authorities];
    }, []);
    const userAuthorities = [...userAuthoritiesInRoles, ...user.authorities];
    const hasRole = () =>
      userAuthorities.some((role: unknown) => !!authorities.find((item) => item === role));
    return user && userAuthorities && hasRole();
  }
}
