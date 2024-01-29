import {
  AUTHENTICATION,
  AUTHENTICATION_DEFAULT_HOST,
  AUTHENTICATION_DEFAULT_PORT,
} from '@edd/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpExceptionService } from '../../http-exception';

@Injectable()
export class AuthenticationService {
  private readonly authenticationServiceUrl!: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    const port = this.configService.get<number>(AUTHENTICATION, AUTHENTICATION_DEFAULT_PORT);
    this.authenticationServiceUrl = `${AUTHENTICATION_DEFAULT_HOST}:${port}`;
  }

  async validateToken(token: string): Promise<any> {
    try {
      const response = await axios.get(`${this.authenticationServiceUrl}/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      // Handle the error appropriately
      throw this.httpExceptionService.badRequest(
        {
          titleKey: 'authentication.validate.title',
          messageKey: 'authentication.validate.message',
        },
        error as string,
      );
    }
  }

  // You can add more methods to interact with different endpoints of the authentication-service
}
