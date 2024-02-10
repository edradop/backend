import {
  MINIO_ENDPOINT,
  MINIO_DEFAULT_ENDPOINT,
  MINIO_PORT,
  MINIO_DEFAULT_PORT,
  MINIO_USE_SSL,
  MINIO_DEFAULT_USE_SSL,
  MINIO_ACCESS_KEY,
  MINIO_DEFAULT_ACCESS_KEY,
  MINIO_SECRET_KEY,
  MINIO_DEFAULT_SECRET_KEY,
  USER_BUCKET_NAME,
  DEFAULT_USER_BUCKET_NAME,
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioEnvironmentService {
  constructor(private readonly configService: ConfigService) {}
  get minioEndpoint(): string {
    return this.configService.get<string>(MINIO_ENDPOINT, MINIO_DEFAULT_ENDPOINT);
  }

  get minioPort(): number {
    return this.configService.get<number>(MINIO_PORT, MINIO_DEFAULT_PORT);
  }

  get minioUseSSL(): boolean {
    return this.configService.get<boolean>(MINIO_USE_SSL, MINIO_DEFAULT_USE_SSL);
  }

  get minioAccessKey(): string {
    return this.configService.get<string>(MINIO_ACCESS_KEY, MINIO_DEFAULT_ACCESS_KEY);
  }

  get minioSecretKey(): string {
    return this.configService.get<string>(MINIO_SECRET_KEY, MINIO_DEFAULT_SECRET_KEY);
  }

  get userBucketName(): string {
    return this.configService.get<string>(USER_BUCKET_NAME, DEFAULT_USER_BUCKET_NAME);
  }
}
