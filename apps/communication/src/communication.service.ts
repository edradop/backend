import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunicationService {
  getData(): { message: string } {
    return { message: 'Hello Communication API' };
  }
}
