import { LoginResponse } from '@edd/authentication/type';
import { MinioService } from '@edd/common/module/minio/service';
import { TUser, UserService } from '@edd/common/module/user';
import { EnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from 'apps/authentication/util';
import axios, { AxiosResponse } from 'axios';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { Readable } from 'stream';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    private environmentService: EnvironmentService,
    private minioService: MinioService,
  ) {}

  async ticket(token: string): Promise<LoginTicket> {
    let ticket: LoginTicket;
    try {
      ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (error) {
      this.logger.error(Object.keys(error as string));
      throw new HttpException('Invalid token signature', HttpStatus.BAD_REQUEST);
    }
    return ticket;
  }
  async continue(response: TokenPayload): Promise<LoginResponse> {
    const savedPicture: string | undefined = await this.savePicture(response);
    try {
      const user = await this.usersService.continueWithGoogle({
        ...response,
        picture: savedPicture,
      });
      if (user) {
        return { user, ...(await this.generateToken(user)) };
      }
      throw new HttpException(
        'User not found or cannot be created due to an internal error',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } catch (error) {
      throw new HttpException(error as string, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async savePicture(response: TokenPayload) {
    if (response.picture) {
      // const picture = await this.getImageAsStream(response.picture);
      try {
        const { stream, picture } = await this.getImageAsStream(response.picture);

        const file = this.minioService.createMulterFileObject(
          stream,
          picture.headers['content-type'].split('/').join('.').replace('jpeg', 'jpg'),
          picture.headers['content-type'],
          +picture.headers['content-length'],
        );

        // console.log(picture.data);
        return await this.minioService.uploadImage(file, this.environmentService.userBucketName);
      } catch (error) {}
    }
    return response.picture;
  }

  async generateToken(user: TUser) {
    return generateToken(user, this.jwtService, this.environmentService);
  }
  async getImageAsStream(
    url: string,
  ): Promise<{ stream: Readable; picture: AxiosResponse<any, any> }> {
    const picture = await axios.get(url, { responseType: 'arraybuffer' });
    const stream = Readable.from(Buffer.from(picture.data, 'binary'));
    return {
      stream,
      picture,
    };
  }
}
