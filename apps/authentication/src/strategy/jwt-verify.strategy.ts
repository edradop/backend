import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_REFRESH_SECRET } from '@edd/common';
import { LoginResponse } from '../type';

@Injectable()
export class JwtVerifyStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: LoginResponse) {
    if (payload?.user?.id) {
      return payload.user;
    }
    return null;
  }
}
