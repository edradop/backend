import { MinioService } from '@edd/common/module/minio/service';
import { TUser } from '@edd/common/module/user';
import { MinioEnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import internal from 'stream';

@Injectable()
export class StorageService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    private readonly minioService: MinioService,
    private readonly minioEnvironmentService: MinioEnvironmentService,
  ) {}

  async getProfilePhoto(user: TUser): Promise<internal.Readable> {
    if (user.profilePhoto) {
      const photo = await this.minioService.client.getObject(
        this.minioEnvironmentService.userBucketName,
        user.profilePhoto,
      );
      return photo;
    }
    throw new HttpException('Profile photo not found', HttpStatus.NOT_FOUND);
  }

  async uploadProfilePhoto(image: Express.Multer.File) {
    const uploadedImage = await this.minioService.uploadImage(
      image,
      this.minioEnvironmentService.userBucketName,
    );

    return {
      imageUrl: this.minioService.generateUrl(
        this.minioEnvironmentService.minioEndpoint,
        this.minioEnvironmentService.minioPort,
        this.minioEnvironmentService.userBucketName,
        uploadedImage,
      ),
      uploadedImage,
      message: 'Image upload successful',
    };
  }
}
