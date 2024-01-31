import {
  AUTHENTICATION_PORT,
  AUTHENTICATION_DEFAULT_PORT,
  ANALYTIC_PORT,
  ANALYTIC_DEFAULT_PORT,
  COMMUNICATION_PORT,
  COMMUNICATION_DEFAULT_PORT,
  EDRADOP_PORT,
  EDRADOP_DEFAULT_PORT,
  PAYMENT_PORT,
  PAYMENT_DEFAULT_PORT,
  STORAGE_PORT,
  STORAGE_DEFAULT_PORT,
  USER_PORT,
  USER_DEFAULT_PORT,
  SESSION_SECRET,
  SESSION_DEFAULT_SECRET,
  JWT_DEFAULT_SECRET,
  JWT_SECRET,
  JWT_REFRESH_DEFAULT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_DEFAULT_EXPIRES_IN,
  JWT_REFRESH_DEFAULT_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  AUTHENTICATION_DEFAULT_HOST,
  USER_DEFAULT_HOST,
  SUPER_DEFAULT_USERNAME,
  SUPER_USERNAME,
  SUPER_DEFAULT_PASSWORD,
  SUPER_PASSWORD,
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
  SUPER_DEFAULT_EMAIL,
  SUPER_EMAIL,
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

  get<T>(key: string, defaultValue?: T): T | undefined {
    return this.configService.get<T>(key, defaultValue as T);
  }
}
