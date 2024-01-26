import { USER_DEFAULT_HOST, USER_DEFAULT_PORT, USER_PORT } from '@edd/common/constant';
import { HttpExceptionService } from '@edd/common/module/http-exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly userServiceUrl!: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpExceptionService: HttpExceptionService,
  ) {
    const port = this.configService.get<number>(USER_PORT, USER_DEFAULT_PORT);
    this.userServiceUrl = `http://${USER_DEFAULT_HOST}:${port}`;
  }

  async validateUserWithEmail(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.userServiceUrl}/user/by-email-password`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      // Handle the error appropriately
      throw this.httpExceptionService.exception(
        HttpStatus.BAD_REQUEST,
        {
          titleKey: 'user.byEmailPassword.error.title',
          messageKey: 'user.byEmailPassword.error.message',
        },
        error as string,
      );
    }
  }
  async validateUserWithUsername(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.userServiceUrl}/user/by-username-password`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      // Handle the error appropriately
      throw this.httpExceptionService.exception(
        HttpStatus.BAD_REQUEST,
        {
          titleKey: 'user.byUsernamePassword.error.title',
          messageKey: 'user.byUsernamePassword.error.message',
        },
        error as string,
      );
    }
  }
  async validateUserById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.userServiceUrl}/user/by-id/${id}`);
      return response.data;
    } catch (error) {
      // Handle the error appropriately
      throw this.httpExceptionService.exception(
        HttpStatus.BAD_REQUEST,
        {
          titleKey: 'user.byId.error.title',
          messageKey: 'user.byId.error.message',
        },
        error as string,
      );
    }
  }
}
