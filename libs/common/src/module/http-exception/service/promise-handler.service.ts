import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpExceptionService } from './http-exception.service';
import { HttpExceptionKeys } from '../type';

@Injectable()
export class PromiseHandlerService {
  constructor(private readonly httpExceptionService: HttpExceptionService) {}

  async badRequest<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.badRequest(keys, error);
    }
  }

  async unauthorized<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.unauthorized(keys, error);
    }
  }

  async forbidden<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.forbidden(keys, error);
    }
  }

  async notFound<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.notFound(keys, error);
    }
  }

  async conflict<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.conflict(keys, error);
    }
  }

  async unprocessableEntity<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.unprocessableEntity(keys, error);
    }
  }

  async internalServerError<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.internalServerError(keys, error);
    }
  }

  async notImplemented<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.notImplemented(keys, error);
    }
  }

  async badGateway<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.badGateway(keys, error);
    }
  }

  async serviceUnavailable<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.serviceUnavailable(keys, error);
    }
  }

  async gatewayTimeout<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.gatewayTimeout(keys, error);
    }
  }

  async tooManyRequests<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.tooManyRequests(keys, error);
    }
  }

  async versionNotSupported<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.versionNotSupported(keys, error);
    }
  }

  async preconditionFailed<T>(promise: Promise<T>, keys?: HttpExceptionKeys) {
    try {
      return await promise;
    } catch (error) {
      throw this.httpExceptionService.preconditionFailed(keys, error);
    }
  }

  async handler<T>(promise: Promise<T>, status: HttpStatus, keys: HttpExceptionKeys) {
    try {
      return promise;
    } catch (error) {
      throw this.httpExceptionService.exception(status, keys, error);
    }
  }
}
