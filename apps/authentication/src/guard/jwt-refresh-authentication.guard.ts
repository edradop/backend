import { extractTokenFromHeader } from '@edd/common/util';
import { JWT_REFRESH_DEFAULT_SECRET } from '@edd/config';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshAuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: JWT_REFRESH_DEFAULT_SECRET,
    });

    delete payload.iat;
    delete payload.exp;
    request['user'] = payload;
    return true;
  }
}
