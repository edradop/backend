import { Public, RequestUser } from '@edd/common';
import {
  EmailPasswordDto,
  LoginResponse,
  SignUpDto,
  UsernamePasswordDto,
} from '@edd/common/module/authentication';
import { TUser } from '@edd/common/module/user';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable } from 'rxjs';
import { JwtRefreshAuthenticationGuard } from '../guard';
import { AuthenticationService } from '../service';

@ApiTags('authentication')
@Controller({ path: '', version: '1' })
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  login(@Body() dto: EmailPasswordDto): Observable<LoginResponse | null> {
    return this.authenticationService.loginWithEmail(dto);
  }
  @Public()
  @Post('signup')
  signUp(@Body() dto: SignUpDto): Observable<LoginResponse | null> {
    return this.authenticationService.signUpWithEmail(dto);
  }

  @Public()
  @UseGuards(JwtRefreshAuthenticationGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: { user: TUser }): LoginResponse | null {
    const { user } = req;
    return this.authenticationService.refreshToken(user);
  }

  @Public()
  @Post('login-with-username')
  loginWithUsername(@Body() dto: UsernamePasswordDto): Observable<LoginResponse | null> {
    return this.authenticationService.loginWithUsername(dto);
  }

  @Get('validate')
  validate(@RequestUser() req: { user: TUser }) {
    const { user } = req;
    return user as TUser;
  }

  @Public()
  @Get('swagger.json')
  swagger() {
    return readFileSync(
      join(__dirname, '../../..', 'apps/authentication/src', 'swagger.json'),
      'utf-8',
    );
  }
}
