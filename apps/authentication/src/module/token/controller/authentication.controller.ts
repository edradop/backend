import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';

@Controller('Token')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  getHello(): string {
    return this.authenticationService.getHello();
  }
}
