import {
  MAIL_DEFAULT_HOST,
  MAIL_DEFAULT_NO_REPLY,
  MAIL_DEFAULT_PASSWORD,
  MAIL_DEFAULT_PORT,
  MAIL_DEFAULT_USERNAME,
  MAIL_HOST,
  MAIL_NO_REPLY,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerEnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>(MAIL_HOST, MAIL_DEFAULT_HOST);
  }

  get port(): number {
    return this.configService.get<number>(MAIL_PORT, MAIL_DEFAULT_PORT);
  }

  get username(): string {
    return this.configService.get<string>(MAIL_USERNAME, MAIL_DEFAULT_USERNAME);
  }

  get password(): string {
    return this.configService.get<string>(MAIL_PASSWORD, MAIL_DEFAULT_PASSWORD);
  }

  get noReplyMailAddress(): string {
    return this.configService.get<string>(MAIL_NO_REPLY, MAIL_DEFAULT_NO_REPLY);
  }
}
