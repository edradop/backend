import { Public } from '@edd/common';
import {
  SIGNUP_USER_WITH_EMAIL_EVENT,
  VALIDATE_USER_WITH_EMAIL_EVENT,
  VALIDATE_USER_WITH_USERNAME_EVENT,
} from '@edd/common/constant/user';
import { EmailPasswordDto, SignUpDto, UsernamePasswordDto } from '@edd/common/type/authentication';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { TokenPayload } from 'google-auth-library';
import { User } from '../export';
import { AuthenticationService } from '../service';

@ApiTags('authentication')
@Controller({ path: 'authentication', version: '1' })
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('continue-with-google')
  continueWithGoogle(@Body() tokenPayload: TokenPayload): Promise<User> {
    this.logger.debug('continue with google', tokenPayload);
    return this.authenticationService.continueWithGoogle(tokenPayload);
  }

  @Public()
  @MessagePattern(SIGNUP_USER_WITH_EMAIL_EVENT)
  signUp(dto: SignUpDto): Promise<User> {
    this.logger.debug('sign up', { ...dto, password: dto.password.replace(/./g, '*') });
    return this.authenticationService.signUp(dto);
  }

  @Public()
  @MessagePattern(VALIDATE_USER_WITH_EMAIL_EVENT)
  getUserByEmailPassword(dto: EmailPasswordDto): Promise<User | null> {
    this.logger.debug('get user by email and password', {
      ...dto,
      password: dto.password.replace(/./g, '*'),
    });
    return this.authenticationService.getUserByEmailPassword(dto);
  }

  @Public()
  @MessagePattern(VALIDATE_USER_WITH_USERNAME_EVENT)
  getUserByUsernamePassword(dto: UsernamePasswordDto): Promise<User | null> {
    this.logger.debug('get user by username and password', {
      ...dto,
      password: dto.password.replace(/./g, '*'),
    });
    return this.authenticationService.getUserByUsernamePassword(dto);
  }
}
