import { IS_PUBLIC_KEY, JWT_SECRET } from '@edd/common';
import { HttpExceptionService } from '@edd/common/module/http-exception';
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly httpExceptionService: HttpExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw this.httpExceptionService.exception(HttpStatus.UNAUTHORIZED, {
        titleKey: 'jwt.Unauthorized.error.title',
        messageKey: 'jwt.Unauthorized.error.message',
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });
      request['user'] = payload;
    } catch (error) {
      throw this.httpExceptionService.exception(
        HttpStatus.UNAUTHORIZED,
        {
          titleKey: 'jwt.UnExpected.error.title',
          messageKey: 'jwt.UnExpected.error.message',
        },
        error as string,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
