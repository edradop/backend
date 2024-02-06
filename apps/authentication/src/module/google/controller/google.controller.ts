import { Public } from '@edd/common';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenPayload } from 'google-auth-library';
import { GoogleService } from '../service';
import { LoginResponse } from '@edd/common/module/authentication';

@ApiTags('google')
@Controller({ path: 'google', version: '1' })
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}
  @Public()
  @Post('google-login')
  async login(@Body() { token }: { token: string }): Promise<LoginResponse> {
    const ticket = await this.googleService.ticket(token);
    const response = ticket.getPayload() as TokenPayload;
    if (!response.email_verified) {
      throw new HttpException('Email not verified', HttpStatus.BAD_REQUEST);
    } else if (!response.email) {
      throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
    }
    return await this.googleService.continue(response);
  }
}