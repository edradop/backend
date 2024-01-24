import { Public, RequestUser, TUser } from '@edd/common';
import { EmailPasswordDto, UsernamePasswordDto } from '@edd/common/module/token';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { error } from 'console';
import { Request } from 'express';
import { AuthenticationService } from '../../service';
import { LoginResponse } from '../../type';
import { JwtVerifyAuthenticationGuard } from '../../guard/jwt-verify-authentication.guard';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  login(@Body() { email, password }: EmailPasswordDto): Promise<LoginResponse | null> {
    return this.authenticationService.loginWithEmail(email, password);
  }

  @Public()
  @UseGuards(JwtVerifyAuthenticationGuard)
  @Post('refresh-token')
  refreshToken(@Req() req: Request): Promise<LoginResponse | null> {
    if (!req.user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
    return this.authenticationService.refreshToken(req.user as TUser);
  }

  @Public()
  @Post('login-with-username')
  loginWithUsername(
    @Body() { username, password }: UsernamePasswordDto,
  ): Promise<LoginResponse | null> {
    return this.authenticationService.loginWithUsername(username, password);
  }

  @Get('validate')
  validate(@RequestUser() req: Request) {
    return req.user as TUser;
  }
}
