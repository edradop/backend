import { SignUpDto } from '@edd/common/module/authentication';
import { USER_DEFAULT_HOST } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserService {
  private readonly userServiceUrl!: string;

  constructor(private readonly portService: EnvironmentService) {
    const port = this.portService.userPort;
    this.userServiceUrl = `http://${USER_DEFAULT_HOST}:${port}`;
  }

  async validateUserWithEmail(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.userServiceUrl}/v1/user/by-email-password`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async validateUserWithUsername(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.userServiceUrl}/v1/user/by-username-password`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async validateUserById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.userServiceUrl}/v1/user/by-id/${id}`);
      return response.data;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async signUpWithEmail(dto: SignUpDto): Promise<any> {
    try {
      const response = await axios.post(`${this.userServiceUrl}/v1/user/signup`, dto);
      return response.data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
