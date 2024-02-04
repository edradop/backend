import {
  ANALYTIC_DEFAULT_PORT,
  ANALYTIC_PORT,
  AUTHENTICATION_DEFAULT_HOST,
  AUTHENTICATION_DEFAULT_PORT,
  AUTHENTICATION_PORT,
  COMMUNICATION_DEFAULT_PORT,
  COMMUNICATION_PORT,
  DEFAULT_USER_BUCKET_NAME,
  EDRADOP_DEFAULT_PORT,
  EDRADOP_PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_DEFAULT_CLIENT_ID,
  GOOGLE_DEFAULT_CLIENT_SECRET,
  JWT_DEFAULT_EXPIRES_IN,
  JWT_DEFAULT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_DEFAULT_EXPIRES_IN,
  JWT_REFRESH_DEFAULT_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
  MINIO_ACCESS_KEY,
  MINIO_DEFAULT_ACCESS_KEY,
  MINIO_DEFAULT_ENDPOINT,
  MINIO_DEFAULT_PORT,
  MINIO_DEFAULT_SECRET_KEY,
  MINIO_DEFAULT_USE_SSL,
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_SECRET_KEY,
  MINIO_USE_SSL,
  PAYMENT_DEFAULT_PORT,
  PAYMENT_PORT,
  POSTGRES_DATABASE,
  POSTGRES_DEFAULT_DATABASE,
  POSTGRES_DEFAULT_HOST,
  POSTGRES_DEFAULT_PASSWORD,
  POSTGRES_DEFAULT_PORT,
  POSTGRES_DEFAULT_USER,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  SESSION_DEFAULT_SECRET,
  SESSION_SECRET,
  STORAGE_DEFAULT_PORT,
  STORAGE_PORT,
  SUPER_DEFAULT_EMAIL,
  SUPER_DEFAULT_PASSWORD,
  SUPER_DEFAULT_USERNAME,
  SUPER_EMAIL,
  SUPER_PASSWORD,
  SUPER_USERNAME,
  USER_BUCKET_NAME,
  USER_DEFAULT_HOST,
  USER_DEFAULT_PORT,
  USER_PORT,
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  get authenticationPort(): number {
    return this.configService.get<number>(AUTHENTICATION_PORT, AUTHENTICATION_DEFAULT_PORT);
  }

  get analyticPort(): number {
    return this.configService.get<number>(ANALYTIC_PORT, ANALYTIC_DEFAULT_PORT);
  }

  get communicationPort(): number {
    return this.configService.get<number>(COMMUNICATION_PORT, COMMUNICATION_DEFAULT_PORT);
  }

  get edradopPort(): number {
    return this.configService.get<number>(EDRADOP_PORT, EDRADOP_DEFAULT_PORT);
  }

  get paymentPort(): number {
    return this.configService.get<number>(PAYMENT_PORT, PAYMENT_DEFAULT_PORT);
  }

  get storagePort(): number {
    return this.configService.get<number>(STORAGE_PORT, STORAGE_DEFAULT_PORT);
  }

  get userPort(): number {
    return this.configService.get<number>(USER_PORT, USER_DEFAULT_PORT);
  }

  get sessionSecret(): string {
    return this.configService.get<string>(SESSION_SECRET, SESSION_DEFAULT_SECRET);
  }

  get jwtSecret(): string {
    return this.configService.get<string>(JWT_SECRET, JWT_DEFAULT_SECRET);
  }

  get jwtRefreshSecret(): string {
    return this.configService.get<string>(JWT_REFRESH_SECRET, JWT_REFRESH_DEFAULT_SECRET);
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>(JWT_EXPIRES_IN, JWT_DEFAULT_EXPIRES_IN);
  }

  get jwtRefreshExpiresIn(): string {
    return this.configService.get<string>(JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_DEFAULT_EXPIRES_IN);
  }

  get authenticationHost(): string {
    return this.configService.get<string>(AUTHENTICATION_PORT, AUTHENTICATION_DEFAULT_HOST);
  }

  get userHost(): string {
    return this.configService.get<string>(USER_PORT, USER_DEFAULT_HOST);
  }

  get superUsername(): string {
    return this.configService.get<string>(SUPER_USERNAME, SUPER_DEFAULT_USERNAME);
  }

  get superEmail(): string {
    return this.configService.get<string>(SUPER_EMAIL, SUPER_DEFAULT_EMAIL);
  }

  get superPassword(): string {
    return this.configService.get<string>(SUPER_PASSWORD, SUPER_DEFAULT_PASSWORD);
  }

  get postgresHost(): string {
    return this.configService.get<string>(POSTGRES_HOST, POSTGRES_DEFAULT_HOST);
  }

  get postgresPort(): number {
    return this.configService.get<number>(POSTGRES_PORT, POSTGRES_DEFAULT_PORT);
  }

  get postgresUser(): string {
    return this.configService.get<string>(POSTGRES_USER, POSTGRES_DEFAULT_USER);
  }

  get postgresPassword(): string {
    return this.configService.get<string>(POSTGRES_PASSWORD, POSTGRES_DEFAULT_PASSWORD);
  }

  get postgresDatabase(): string {
    return this.configService.get<string>(POSTGRES_DATABASE, POSTGRES_DEFAULT_DATABASE);
  }

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

  get googleClientId(): string {
    return this.configService.get<string>(GOOGLE_CLIENT_ID, GOOGLE_DEFAULT_CLIENT_ID);
  }
  get googleClientSecret(): string {
    return this.configService.get<string>(GOOGLE_CLIENT_SECRET, GOOGLE_DEFAULT_CLIENT_SECRET);
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    return this.configService.get<T>(key, defaultValue as T);
  }
}
