import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class CommunicationService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  handleUserCreated(data: CreateUserEvent) {
    console.log('handlerUserCreated - COMMUNICATIONS', data);
    // TODO: Email the user...
  }
}
