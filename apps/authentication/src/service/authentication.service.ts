import { JWT_REFRESH_SECRET, JWT_SECRET } from '@edd/common';
import { TUser, UserService } from '@edd/common/module/user';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '../type';

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
  async refreshToken(user: TUser): Promise<LoginResponse | null> {
    if (user) {
      return { user, ...(await this.generateToken(user)) };
    }
    return null;
  }

  async generateToken(user: TUser) {
    const data = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign(data, {
      expiresIn: '2h',
      secret: JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
      secret: JWT_REFRESH_SECRET,
    });
    const decodedAccessToken = this.jwtService.decode(accessToken);
    const decodedRefreshToken = this.jwtService.decode(refreshToken);
    console.log('decodedAccessToken', decodedAccessToken);
    console.log('decodedRefreshToken', decodedRefreshToken);
    return {
      accessToken,
      refreshToken,
      accessTokenExp: decodedAccessToken['exp'],
      refreshTokenExp: decodedRefreshToken['exp'],
    };
  }
}
