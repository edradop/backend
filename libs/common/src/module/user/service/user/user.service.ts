import { USER_DEFAULT_HOST, USER_DEFAULT_PORT, USER_PORT } from '@edd/common/constant';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly userServiceUrl!: string;

  constructor(private readonly configService: ConfigService) {
    const port = this.configService.get<number>(USER_PORT) || USER_DEFAULT_PORT;
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
      throw BadRequestException;
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
      throw BadRequestException;
    }
  }
}
