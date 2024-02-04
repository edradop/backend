import { SignUpDto } from '@edd/common/module/authentication';
import { TUser, UserService } from '@edd/common/module/user';
import { EnvironmentService } from '@edd/config/module/environment';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from 'apps/authentication/util';
import { LoginResponse } from '../type';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    private environmentService: EnvironmentService,
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
    return generateToken(user, this.jwtService, this.environmentService);
  }
}
