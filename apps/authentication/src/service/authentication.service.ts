import { SignUpDto } from '@edd/common/module/authentication';
import { TUser, UserService } from '@edd/common/module/user';
import {
  JWT_REFRESH_DEFAULT_SECRET,
  JWT_DEFAULT_SECRET,
  JWT_DEFAULT_EXPIRES_IN,
  JWT_REFRESH_DEFAULT_EXPIRES_IN,
} from '@edd/config';
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

  async signUpWithEmail(dto: SignUpDto): Promise<LoginResponse | null> {
    const user = await this.usersService.signUpWithEmail(dto);
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
      profilePhoto: user.profilePhoto,
    };
    const accessToken = this.jwtService.sign(data, {
      expiresIn: JWT_DEFAULT_EXPIRES_IN,
      secret: JWT_DEFAULT_SECRET,
    });
    const refreshToken = this.jwtService.sign(data, {
      expiresIn: JWT_REFRESH_DEFAULT_EXPIRES_IN,
      secret: JWT_REFRESH_DEFAULT_SECRET,
    });
    const decodedAccessToken = this.jwtService.decode(accessToken);
    const decodedRefreshToken = this.jwtService.decode(refreshToken);
    return {
      accessToken,
      refreshToken,
      accessTokenExp: decodedAccessToken['exp'],
      refreshTokenExp: decodedRefreshToken['exp'],
    };
  }
}
