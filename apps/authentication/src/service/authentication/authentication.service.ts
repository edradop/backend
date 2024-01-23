import { JWT_REFRESH_SECRET } from '@edd/common';
import { TUser, UserService } from '@edd/common/module/user';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '../../type';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}
  async loginWithEmail(email: string, password: string): Promise<LoginResponse | null> {
    const user = await this.usersService.validateUserWithEmail(email, password);
    if (user) {
      return { user, ...(await this.generateToken(user)) };
    }
    return null;
  }

  async loginWithUsername(username: string, password: string): Promise<LoginResponse | null> {
    const user = await this.usersService.validateUserWithUsername(username, password);
    if (user) {
      return { user, ...(await this.generateToken(user)) };
    }
    return null;
  }

  async generateToken(user: TUser) {
    return {
      accessToken: this.jwtService.sign(user),
      refreshToken: this.jwtService.sign(user, {
        expiresIn: '7d',
        secret: JWT_REFRESH_SECRET,
      }),
    };
  }
}
