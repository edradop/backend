import { Injectable } from '@nestjs/common';

@Injectable()
export class EdradopService {
  getHello(): string {
    return 'Hello Edradop!';
  }
}
