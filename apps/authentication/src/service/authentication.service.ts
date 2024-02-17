import {
  SIGNUP_USER_WITH_EMAIL_EVENT,
  VALIDATE_USER_WITH_EMAIL_EVENT,
  VALIDATE_USER_WITH_USERNAME_EVENT,
} from '@edd/common/constant/user';
import { TUser } from '@edd/common/module/user';
import {
  EmailPasswordDto,
  LoginResponse,
  SignUpDto,
  UsernamePasswordDto,
} from '@edd/common/type/authentication';
import { USER_CLIENT_PROXY } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map } from 'rxjs';
import { generateToken } from '../../util';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private jwtService: JwtService,
    private environmentService: EnvironmentService,
    @Inject(USER_CLIENT_PROXY)
    private readonly userClient: ClientProxy,
  ) {}
  loginWithEmail(dto: EmailPasswordDto): Observable<LoginResponse | null> {
    this.logger.debug(`loginWithEmail: ${dto.email} ${dto.password.replace(/./g, '*')}`);
    return this.userClient.send(VALIDATE_USER_WITH_EMAIL_EVENT, dto).pipe(
      map((user) => {
        if (user) {
          return { user, ...this.generateToken(user) };
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  signUpWithEmail(dto: SignUpDto): Observable<LoginResponse | null> {
    this.logger.debug(`signUpWithEmail: ${JSON.stringify(dto)}`);
    return this.userClient.send(SIGNUP_USER_WITH_EMAIL_EVENT, dto).pipe(
      map((user) => {
        if (user) {
          return { user, ...this.generateToken(user) };
        }
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      }),
    );
  }

  loginWithUsername(dto: UsernamePasswordDto): Observable<LoginResponse | null> {
    this.logger.debug(`loginWithUsername: ${JSON.stringify(dto)}`);
    return this.userClient.send(VALIDATE_USER_WITH_USERNAME_EVENT, dto).pipe(
      map((user) => {
        if (user) {
          return { user, ...this.generateToken(user) };
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }),
    );
  }

  refreshToken(user: TUser): LoginResponse | null {
    if (user) {
      return { user, ...this.generateToken(user) };
    }
    return null;
  }

  generateToken(user: TUser) {
    return generateToken(user, this.jwtService, this.environmentService);
  }
}
