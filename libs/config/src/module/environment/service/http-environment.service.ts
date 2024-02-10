import {
  AUTHENTICATION_PORT,
  AUTHENTICATION_DEFAULT_PORT,
  ANALYTIC_PORT,
  ANALYTIC_DEFAULT_PORT,
  COMMUNICATION_PORT,
  COMMUNICATION_DEFAULT_PORT,
  COMMUNICATION_HOST,
  COMMUNICATION_DEFAULT_HOST,
  EDRADOP_PORT,
  EDRADOP_DEFAULT_PORT,
  PAYMENT_PORT,
  PAYMENT_DEFAULT_PORT,
  STORAGE_PORT,
  STORAGE_DEFAULT_PORT,
  USER_PORT,
  USER_DEFAULT_PORT,
  USER_DEFAULT_HOST,
  ANALYTIC_DEFAULT_HOST,
  ANALYTIC_HOST,
  AUTHENTICATION_DEFAULT_HOST,
  AUTHENTICATION_HOST,
  EDRADOP_DEFAULT_HOST,
  EDRADOP_HOST,
  PAYMENT_DEFAULT_HOST,
  PAYMENT_HOST,
  STORAGE_DEFAULT_HOST,
  STORAGE_HOST,
  USER_HOST,
  USER_CLIENT_PORT,
  USER_CLIENT_DEFAULT_PORT,
} from '@edd/config/constant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
type ExtractName<S extends string> = S extends `${infer P}Port`
  ? P
  : S extends `${infer H}Host`
    ? H
    : S;

@Injectable()
export class HttpEnvironmentService {
  constructor(private readonly configService: ConfigService) {}
  get userClientPort(): number {
    return this.configService.get<number>(USER_CLIENT_PORT, USER_CLIENT_DEFAULT_PORT);
  }

  get analyticPort(): number {
    return this.configService.get<number>(ANALYTIC_PORT, ANALYTIC_DEFAULT_PORT);
  }

  get authenticationPort(): number {
    return this.configService.get<number>(AUTHENTICATION_PORT, AUTHENTICATION_DEFAULT_PORT);
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

  get analyticHost(): string {
    return this.configService.get<string>(ANALYTIC_HOST, ANALYTIC_DEFAULT_HOST);
  }

  get authenticationHost(): string {
    return this.configService.get<string>(AUTHENTICATION_HOST, AUTHENTICATION_DEFAULT_HOST);
  }

  get communicationHost(): string {
    return this.configService.get<string>(COMMUNICATION_HOST, COMMUNICATION_DEFAULT_HOST);
  }

  get edradopHost(): string {
    return this.configService.get<string>(EDRADOP_HOST, EDRADOP_DEFAULT_HOST);
  }

  get paymentHost(): string {
    return this.configService.get<string>(PAYMENT_HOST, PAYMENT_DEFAULT_HOST);
  }

  get storageHost(): string {
    return this.configService.get<string>(STORAGE_HOST, STORAGE_DEFAULT_HOST);
  }

  get userHost(): string {
    return this.configService.get<string>(USER_HOST, USER_DEFAULT_HOST);
  }

  url(name: Exclude<ExtractName<keyof InstanceType<typeof HttpEnvironmentService>>, 'url'>) {
    switch (name) {
      case 'analytic':
        return `http://${this.analyticHost}:${this.analyticPort}`;
      case 'authentication':
        return `http://${this.authenticationHost}:${this.authenticationPort}`;
      case 'communication':
        return `http://${this.communicationHost}:${this.communicationPort}`;
      case 'edradop':
        return `http://${this.edradopHost}:${this.edradopPort}`;
      case 'payment':
        return `http://${this.paymentHost}:${this.paymentPort}`;
      case 'storage':
        return `http://${this.storageHost}:${this.storagePort}`;
      case 'user':
        return `http://${this.userHost}:${this.userPort}`;
      default:
        return '';
    }
  }
}
