import { LoginResponse } from '@edd/authentication/type';
import { MinioService } from '@edd/common/module/minio/service';
import { TUser, UserService } from '@edd/common/module/user';
import { EnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from 'apps/authentication/util';
import axios, { AxiosResponse } from 'axios';
import { TokenPayload } from 'google-auth-library';
import { Readable } from 'stream';

@Injectable()
export class GoogleService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    private environmentService: EnvironmentService,
    private minioService: MinioService,
  ) {}
  async continue(response: TokenPayload): Promise<LoginResponse> {
    let savedPicture: string | undefined;
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
        savedPicture = await this.minioService.uploadImage(
          file,
          this.environmentService.userBucketName,
        );
      } catch (error) {}
    }
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
