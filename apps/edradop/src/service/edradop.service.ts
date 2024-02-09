import { AUTHENTICATION_CLIENT_PROXY } from '@edd/config';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class EdradopService {
  constructor(
    @Inject(AUTHENTICATION_CLIENT_PROXY)
    private readonly authenticationClient: ClientProxy,
  ) {}
  getHello(): Observable<number> {
    this.authenticationClient.connect();
    console.log('connected');
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.authenticationClient.send<number>(pattern, payload);
  }
}
