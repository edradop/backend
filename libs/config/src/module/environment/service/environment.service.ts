import {
  CACHE_DEFAULT_HOST,
  CACHE_DEFAULT_PORT,
  CACHE_DEFAULT_TTL,
  CACHE_HOST,
  CACHE_PORT,
  CACHE_TTL,
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
  SESSION_DEFAULT_SECRET,
  SESSION_SECRET,
  SUPER_DEFAULT_EMAIL,
  SUPER_DEFAULT_PASSWORD,
  SUPER_DEFAULT_USERNAME,
  SUPER_EMAIL,
  SUPER_PASSWORD,
  SUPER_USERNAME,
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

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

  get superUsername(): string {
    return this.configService.get<string>(SUPER_USERNAME, SUPER_DEFAULT_USERNAME);
  }

  get superEmail(): string {
    return this.configService.get<string>(SUPER_EMAIL, SUPER_DEFAULT_EMAIL);
  }

  get superPassword(): string {
    return this.configService.get<string>(SUPER_PASSWORD, SUPER_DEFAULT_PASSWORD);
  }

  get googleClientId(): string {
    return this.configService.get<string>(GOOGLE_CLIENT_ID, GOOGLE_DEFAULT_CLIENT_ID);
  }
  get googleClientSecret(): string {
    return this.configService.get<string>(GOOGLE_CLIENT_SECRET, GOOGLE_DEFAULT_CLIENT_SECRET);
  }

  get cacheHost(): string {
    return this.configService.get<string>(CACHE_HOST, CACHE_DEFAULT_HOST);
  }

  get cachePort(): number {
    return this.configService.get<number>(CACHE_PORT, CACHE_DEFAULT_PORT);
  }

  get cacheTtl(): number {
    return this.configService.get<number>(CACHE_TTL, CACHE_DEFAULT_TTL);
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    return this.configService.get<T>(key, defaultValue as T);
  }
}
