import { AUTHENTICATION_DEFAULT_HOST } from '@edd/config';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthenticationService {
  private readonly authenticationServiceUrl!: string;

  constructor(private readonly httpEnvironmentService: HttpEnvironmentService) {
    const port = this.httpEnvironmentService.authenticationPort;
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
      throw new BadRequestException(error);
    }
  }

  // You can add more methods to interact with different endpoints of the authentication-service
}
