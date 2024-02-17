import { MinioService } from '@edd/common/module/minio/service';
import { TUser } from '@edd/common/module/user';
import { LoginResponse } from '@edd/common/type/authentication';
import { EnvironmentService, HttpEnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios, { AxiosResponse } from 'axios';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import { Readable } from 'stream';
import { generateToken } from '../../../../util';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);
  constructor(
    private jwtService: JwtService,
    private environmentService: EnvironmentService,
    private httpEnvironmentService: HttpEnvironmentService,
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
    const { data: user } = await axios.post(
      `${this.httpEnvironmentService.url('user')}/v1/user/continue-with-google`,
      response,
    );
    const loginResponse = { user, ...(await this.generateToken(user)) };
    const savedPicture: string | undefined = await this.savePicture(
      response,
      loginResponse.accessToken,
    );

    if (savedPicture) {
      return await axios.put(`${this.httpEnvironmentService.url('user')}/v1/user/${user.id}`, {
        ...response,
        profilePhoto: savedPicture,
      });
    }
    if (user) {
      return user;
    }

    throw new HttpException(
      'User not found or cannot be created due to an internal error',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async savePicture(response: TokenPayload, token: string) {
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
        const data = await axios
          .post(
            `${this.httpEnvironmentService.url('storage')}/v1/upload-profile-photo`,
            file, // TODO: need to change
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // need to change
              },
            },
          )
          .then((res) => res.data);

        return data.uploadedImage;
      } catch (error) {
        this.logger.error(error);
      }
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
