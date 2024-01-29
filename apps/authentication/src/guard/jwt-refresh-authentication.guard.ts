import { JWT_REFRESH_SECRET } from '@edd/common';
import { HttpExceptionService } from '@edd/common/module/http-exception';
import { extractTokenFromHeader } from '@edd/common/util/extractTokenFromHeader.util';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshAuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly httpExceptionService: HttpExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw this.httpExceptionService.unauthorized({
        titleKey: 'jwtRefresh.Unauthorized.title',
        messageKey: 'jwtRefresh.Unauthorized.message',
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
      this.httpExceptionService.unauthorized(
        {
          titleKey: 'jwtRefresh.UnExpected.title',
          messageKey: 'jwtRefresh.UnExpected.message',
        },
        error as string,
      );
    }
    return true;
  }
}