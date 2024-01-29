import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HttpExceptionService } from '../../http-exception';
import { PortService } from '@edd/config/module/port';
import { AUTHENTICATION_DEFAULT_HOST } from '@edd/config';

@Injectable()
export class AuthenticationService {
  private readonly authenticationServiceUrl!: string;

  constructor(
    private readonly portService: PortService,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    const port = this.portService.authenticationPort;
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
