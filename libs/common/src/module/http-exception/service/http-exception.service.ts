import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HttpExceptionService {
  exception(status: HttpStatus, keys: { titleKey: string; messageKey: string }, error?: string) {
    const response = {
      statusCode: status,
      error: error || 'Http Exception',
      ...keys,
    };
    return new HttpException(response, status);
  }
}
