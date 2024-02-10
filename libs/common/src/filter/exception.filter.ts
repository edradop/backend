import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';
import { GlobalResponseError } from '../type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Handles the caught exception and sends a JSON error response.
   *
   * @param {HttpException} exception - the caught exception
   * @param {ArgumentsHost} host - the arguments host
   * @return {void} no return value
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.debug(exception.constructor);
    const { status, message, code } = this.extractExceptionDetails(exception);

    const name = HttpStatusCode[status].toLowerCase();
    const key = this.findKey(request);
    // const key = request.url.match(/([^/]+)(\/)?([\w]+-[\w-]+)?$/)?.[1];
    const methodKey = request.method.toLowerCase();
    const errorKey = `${key}.${methodKey}.${name}`;

    this.logger.error(message, exception.stack, `${request.method} ${request.url}`);

    const errorResponse: GlobalResponseError = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : message,
      code,
      errorKey,
      method: methodKey,
    };

    response.status(status).json(errorResponse);
  }

  /**
   * Find the key in the URL path that does not match the uuid pattern or number.
   *
   * @param {Request} request - the request object
   * @return {string} the key in the URL path that does not match the uuid pattern or number.
   */
  private findKey(request: Request): string | undefined {
    return request.url
      .split('/')
      .reverse()
      .find((item) => {
        return (
          !/\d+/.test(item) &&
          !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(item)
        );
      })
      ?.replace(/\./g, '-');
  }

  /**
   * Extracts and formats exception details.
   *
   * @param exception The exception to process.
   * @returns An object containing the status code, message, and code associated with the exception.
   */
  private extractExceptionDetails(exception: HttpException): {
    status: HttpStatus;
    message: string;
    code: string;
  } {
    let status: HttpStatus;
    let message!: string;
    let code!: string;
    switch (exception.constructor) {
      case HttpException:
        status = exception.getStatus();
        message = exception.message;
        break;
      case TokenExpiredError:
        status = HttpStatus.UNAUTHORIZED;
        message = exception.message;
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        code = (exception as unknown as { code: string }).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        code = (exception as unknown as { code: string }).code;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        code = (exception as unknown as { code: string }).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return { status, message, code };
  }
}
