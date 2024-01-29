import { USER_DEFAULT_HOST, USER_DEFAULT_PORT, USER_PORT } from '@edd/common/constant';
import { SignUpDto } from '@edd/common/module/authentication';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly userServiceUrl!: string;

  constructor(private readonly configService: ConfigService) {
    const port = this.configService.get<number>(USER_PORT, USER_DEFAULT_PORT);
    this.userServiceUrl = `http://${USER_DEFAULT_HOST}:${port}`;
  }

  async validateUserWithEmail(email: string, password: string): Promise<any> {
    const response = await axios.post(`${this.userServiceUrl}/user/by-email-password`, {
      email,
      password,
    });
    return response.data;
  }
  async validateUserWithUsername(username: string, password: string): Promise<any> {
    const response = await axios.post(`${this.userServiceUrl}/user/by-username-password`, {
      username,
      password,
    });
    return response.data;
  }
  async validateUserById(id: string): Promise<any> {
    const response = await axios.get(`${this.userServiceUrl}/user/by-id/${id}`);
    return response.data;
  }
  async signUpWithEmail(dto: SignUpDto): Promise<any> {
    const response = await axios.post(`${this.userServiceUrl}/user/signup`, dto);
    return response.data;
  }
}
