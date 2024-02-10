import { MinioService } from '@edd/common/module/minio/service';
import { MinioEnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'apps/user/src/module/user/export';

@Injectable()
export class StorageService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(
    private readonly minioService: MinioService,
    private readonly minioEnvironmentService: MinioEnvironmentService,
  ) {}

  async getProfilePhoto(user: User): Promise<string> {
    if (user.profilePhoto) {
      const photo = await this.minioService.client.presignedGetObject(
        this.minioEnvironmentService.userBucketName,
        user.profilePhoto,
      );
      return photo; // TODO: should send object not object url
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
