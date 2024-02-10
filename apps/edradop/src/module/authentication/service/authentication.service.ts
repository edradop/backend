import {
  EmailPasswordDto,
  LoginResponse,
  REFRESH_TOKEN_EVENT,
  SIGNUP_USER_WITH_EMAIL_EVENT,
  SignUpDto,
  UsernamePasswordDto,
  VALIDATE_USER_WITH_EMAIL_EVENT,
} from '@edd/common/module/authentication';
import { TUser } from '@edd/common/module/user';
import { AUTHENTICATION_CLIENT_PROXY } from '@edd/config';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_CLIENT_PROXY)
    private readonly authenticationClient: ClientProxy,
  ) {}
  loginWithEmail(dto: EmailPasswordDto): Observable<LoginResponse | null> {
    return this.authenticationClient.send<LoginResponse | null>(
      VALIDATE_USER_WITH_EMAIL_EVENT,
      dto,
    );
  }

  signUpWithEmail(dto: SignUpDto): Observable<LoginResponse | null> {
    return this.authenticationClient.send<LoginResponse | null>(SIGNUP_USER_WITH_EMAIL_EVENT, dto);
  }

  loginWithUsername(dto: UsernamePasswordDto): Observable<LoginResponse | null> {
    return this.authenticationClient.send<LoginResponse | null>(REFRESH_TOKEN_EVENT, dto);
  }
  refreshToken(user: TUser): Observable<LoginResponse | null> {
    return this.authenticationClient.send<LoginResponse | null>(REFRESH_TOKEN_EVENT, user);
  }
}
