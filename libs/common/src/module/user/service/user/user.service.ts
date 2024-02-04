import { SignUpDto } from '@edd/common/module/authentication';
import { USER_DEFAULT_HOST } from '@edd/config';
import { EnvironmentService } from '@edd/config/module/environment';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class UserService {
  private readonly userServiceUrl!: string;
  private readonly logger = new Logger(`Common ${UserService.name}`);

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
      this.logger.error(error);
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST);
    }
  }
  async validateUserById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.userServiceUrl}/v1/user/by-id/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error as string, HttpStatus.BAD_REQUEST);
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

  async continueWithGoogle(payload: TokenPayload): Promise<any> {
    try {
      const response = await axios.post(
        `${this.userServiceUrl}/v1/user/continue-with-google`,
        payload,
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
