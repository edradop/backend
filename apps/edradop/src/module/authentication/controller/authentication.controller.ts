import { Public } from '@edd/common';
import {
  EmailPasswordDto,
  LoginResponse,
  SignUpDto,
  UsernamePasswordDto,
} from '@edd/common/module/authentication';
import { TUser } from '@edd/common/module/user';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() dto: EmailPasswordDto): Observable<LoginResponse | null> {
    return this.authenticationService.loginWithEmail(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto): Observable<LoginResponse | null> {
    return this.authenticationService.signUpWithEmail(dto);
  }

  @Post('refresh-token')
  refreshToken(@Req() req: { user: TUser }): Observable<LoginResponse | null> {
    const { user } = req;
    return this.authenticationService.refreshToken(user);
  }

  @Public()
  @Post('login-with-username')
  loginWithUsername(@Body() dto: UsernamePasswordDto): Observable<LoginResponse | null> {
    return this.authenticationService.loginWithUsername(dto);
  }
}
