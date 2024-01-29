import { Public, RequestUser } from '@edd/common';
import { HttpExceptionService } from '@edd/common/module/http-exception';
import {
  EmailPasswordDto,
  SignUpDto,
  UsernamePasswordDto,
} from '@edd/common/module/authentication';
import { TUser } from '@edd/common/module/user';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtRefreshAuthenticationGuard } from '../guard';
import { AuthenticationService } from '../service';
import { LoginResponse } from '../type';

@ApiTags('authentication')
@Controller({ path: 'authentication', version: '1' })
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly httpExceptionService: HttpExceptionService,
  ) {}

  @Public()
  @Post('login')
  login(@Body() { email, password }: EmailPasswordDto): Promise<LoginResponse | null> {
    return this.authenticationService.loginWithEmail(email, password);
  }
  @Public()
  @Post('signup')
  signUp(@Body() dto: SignUpDto): Promise<LoginResponse | null> {
    return this.authenticationService.signUpWithEmail(dto);
  }

  @Public()
  @UseGuards(JwtRefreshAuthenticationGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: { user: TUser }): Promise<LoginResponse | null> {
    const { user } = req;
    if (!user) {
      throw this.httpExceptionService.notFound({
        titleKey: 'user.notFound.title',
        messageKey: 'user.notFound.message',
      });
    }
    return this.authenticationService.refreshToken(user as TUser);
  }

  @Public()
  @Post('login-with-username')
  loginWithUsername(
    @Body() { username, password }: UsernamePasswordDto,
  ): Promise<LoginResponse | null> {
    return this.authenticationService.loginWithUsername(username, password);
  }

  @Get('validate')
  validate(@RequestUser() req: { user: TUser }) {
    const { user } = req;
    return user as TUser;
  }
}
