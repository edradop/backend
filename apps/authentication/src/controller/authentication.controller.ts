import { Public, RequestUser } from '@edd/common';
import { EmailPasswordDto, UsernamePasswordDto } from '@edd/common/module/token';
import { TUser } from '@edd/common/module/user';
import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '../service';
import { LoginResponse } from '../type';
import { HttpExceptionService } from '@edd/common/module/http-exception';
import { JwtVerifyAuthenticationGuard } from '../guard';
import { ApiTags } from '@nestjs/swagger';

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
  @UseGuards(JwtVerifyAuthenticationGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: { user: TUser }): Promise<LoginResponse | null> {
    const { user } = req;
    if (!user) {
      throw this.httpExceptionService.exception(HttpStatus.NOT_FOUND, {
        titleKey: 'user.notFound.error.title',
        messageKey: 'user.notFound.error.message',
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
