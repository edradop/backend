import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';
import { GlobalResponseError } from '../type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status!: HttpStatus;
    let message!: string;
    let code!: string;

    switch (exception.constructor) {
      case HttpException:
        status = exception.getStatus();
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        code = (exception as any).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    this.logger.error(message, exception.stack, `${request.method} ${request.url}`);

    const name = HttpStatusCode[status].toLowerCase();
    const key = request.url
      .split('/')
      .reverse()
      .find((item) => {
        return !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          item,
        );
      });
    // const key = request.url.match(/([^/]+)(\/)?([\w]+-[\w-]+)?$/)?.[1];

    const methodKey = request.method.toLowerCase();
    const errorKey = `${key}.${methodKey}.${name}`;

    const errorResponse: GlobalResponseError = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      code,
      errorKey,
      method: methodKey,
    };

    response.status(status).json(errorResponse);
  }
}
