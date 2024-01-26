import { JWT_REFRESH_SECRET } from '@edd/common';
import { HttpExceptionService } from '@edd/common/module/http-exception';
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtVerifyAuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly httpExceptionService: HttpExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw this.httpExceptionService.exception(HttpStatus.UNAUTHORIZED, {
        titleKey: 'jwtVerify.Unauthorized.error.title',
        messageKey: 'jwtVerify.Unauthorized.error.message',
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_REFRESH_SECRET,
      });

      delete payload.iat;
      delete payload.exp;
      request['user'] = payload;
    } catch (error) {
      this.httpExceptionService.exception(
        HttpStatus.UNAUTHORIZED,
        {
          titleKey: 'jwtVerify.UnExpected.error.title',
          messageKey: 'jwtVerify.UnExpected.error.message',
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
