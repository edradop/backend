import { IS_PUBLIC, JWT_DEFAULT_SECRET } from '@edd/config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from '../util';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: JWT_DEFAULT_SECRET,
    });
    request['user'] = payload;
    return true;
  }
}
