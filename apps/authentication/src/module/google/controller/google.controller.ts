import { Public } from '@edd/common';
import { LoginResponse } from '@edd/common/type/authentication';
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleService } from '../service';

@ApiTags('google')
@Controller({ path: 'google', version: '1' })
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}
  @Public()
  @Post('google-login')
  async login(@Body() { token }: { token: string }): Promise<LoginResponse> {
    const ticket = await this.googleService.ticket(token);
    const response = ticket.getPayload()!;
    if (!response.email_verified) {
      throw new HttpException('Email not verified', HttpStatus.BAD_REQUEST);
    } else if (!response.email) {
      throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
    }
    return await this.googleService.continue(response);
  }
}
