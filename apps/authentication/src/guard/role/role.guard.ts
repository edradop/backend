import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const handlerAuthorities =
      this.reflector.get<string[]>('authorities', context.getHandler()) || [];
    const classAuthorities = this.reflector.get<string[]>('authorities', context.getClass()) || [];
    const authorities = [...handlerAuthorities, ...classAuthorities];

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log('role guard --> ', user);
    // setTimeout(() => {
    //   console.log('role guard setTimeout --> ', request.user);
    // }, 20);
    if (!authorities || !authorities.length) {
      return true;
    }
    const userAuthoritiesInRoles = user
      ? (user.roles || []).reduce((all, role) => all.concat(role.authorities), [])
      : [];
    const userAuthorities = user ? (user.authorities || []).concat(userAuthoritiesInRoles) : [];
    const hasRole = () =>
      userAuthorities.some((role) => !!authorities.find((item) => item === role));
    return user && userAuthorities && hasRole();
  }
}
