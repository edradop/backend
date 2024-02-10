import {
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
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseEnvironmentService {
  constructor(private readonly configService: ConfigService) {}

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
}
