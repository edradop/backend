import { Public } from '@edd/common';
import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { GoogleService } from '../service';
import { LoginResponse } from '@edd/authentication/type';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

@ApiTags('google')
@Controller('google')
export class GoogleController {
  private readonly logger = new Logger(GoogleController.name);

  constructor(private readonly googleService: GoogleService) {}
  @Public()
  @Post('google-login')
  async login(@Body() { token }: { token: string }): Promise<LoginResponse> {
    let ticket: LoginTicket;
    try {
      ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      this.logger.error(Object.keys(error as string));
      throw new HttpException('Invalid token signature', HttpStatus.BAD_REQUEST);
    }
    const response = ticket.getPayload() as TokenPayload;
    if (!response.email_verified) {
      throw new HttpException('Email not verified', HttpStatus.BAD_REQUEST);
    } else if (!response.email) {
      throw new HttpException('Email not found', HttpStatus.BAD_REQUEST);
    }
    return await this.googleService.continue(response);
  }
}
