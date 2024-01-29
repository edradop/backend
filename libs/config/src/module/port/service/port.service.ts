import {
  AUTHENTICATION,
  AUTHENTICATION_DEFAULT_PORT,
  ANALYTIC,
  ANALYTIC_DEFAULT_PORT,
  COMMUNICATION,
  COMMUNICATION_DEFAULT_PORT,
  EDRADOP,
  EDRADOP_DEFAULT_PORT,
  PAYMENT,
  PAYMENT_DEFAULT_PORT,
  STORAGE,
  STORAGE_DEFAULT_PORT,
  USER_PORT,
  USER_DEFAULT_PORT,
  SESSION_SECRET,
  SESSION_SECRET_DEFAULT,
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortService {
  constructor(private readonly configService: ConfigService) {}

  get authenticationPort(): number {
    return this.configService.get<number>(AUTHENTICATION, AUTHENTICATION_DEFAULT_PORT);
  }

  get analyticPort(): number {
    return this.configService.get<number>(ANALYTIC, ANALYTIC_DEFAULT_PORT);
  }

  get communicationPort(): number {
    return this.configService.get<number>(COMMUNICATION, COMMUNICATION_DEFAULT_PORT);
  }

  get edradopPort(): number {
    return this.configService.get<number>(EDRADOP, EDRADOP_DEFAULT_PORT);
  }

  get paymentPort(): number {
    return this.configService.get<number>(PAYMENT, PAYMENT_DEFAULT_PORT);
  }

  get storagePort(): number {
    return this.configService.get<number>(STORAGE, STORAGE_DEFAULT_PORT);
  }

  get userPort(): number {
    return this.configService.get<number>(USER_PORT, USER_DEFAULT_PORT);
  }

  get sessionSecret(): string {
    return this.configService.get<string>(SESSION_SECRET, SESSION_SECRET_DEFAULT);
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    return this.configService.get<T>(key, defaultValue as T);
  }
}
