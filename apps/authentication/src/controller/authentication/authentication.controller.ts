import { Public, RequestUser } from '@edd/common';
import { EmailPasswordDto, UsernamePasswordDto } from '@edd/common/module/token';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationService } from '../../service';
import { LoginResponse } from '../../type';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  login(@Body() { email, password }: EmailPasswordDto): Promise<LoginResponse | null> {
    return this.authenticationService.loginWithEmail(email, password);
  }

  @Public()
  @Post('loginWithUsername')
  loginWithUsername(
    @Body() { username, password }: UsernamePasswordDto,
  ): Promise<LoginResponse | null> {
    return this.authenticationService.loginWithUsername(username, password);
  }

  @Get('validate')
  validate(@RequestUser() req: Request) {
    return req.user;
  }
}
