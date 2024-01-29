import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpExceptionKeys } from '../type';

@Injectable()
export class HttpExceptionService {
  isProduction = process.env.NODE_ENV === 'production';

  badRequest(keys: HttpExceptionKeys = defaultKeys.badRequestKeys, error?: unknown) {
    return this.exception(HttpStatus.BAD_REQUEST, keys, error);
  }

  unauthorized(keys: HttpExceptionKeys = defaultKeys.unauthorizedKeys, error?: unknown) {
    return this.exception(HttpStatus.UNAUTHORIZED, keys, error);
  }

  forbidden(keys: HttpExceptionKeys = defaultKeys.forbiddenKeys, error?: unknown) {
    return this.exception(HttpStatus.FORBIDDEN, keys, error);
  }

  notFound(keys: HttpExceptionKeys = defaultKeys.notFoundKeys, error?: unknown) {
    return this.exception(HttpStatus.NOT_FOUND, keys, error);
  }

  conflict(keys: HttpExceptionKeys = defaultKeys.conflictKeys, error?: unknown) {
    return this.exception(HttpStatus.CONFLICT, keys, error);
  }

  unprocessableEntity(
    keys: HttpExceptionKeys = defaultKeys.unprocessableEntityKeys,
    error?: unknown,
  ) {
    return this.exception(HttpStatus.UNPROCESSABLE_ENTITY, keys, error);
  }

  internalServerError(
    keys: HttpExceptionKeys = defaultKeys.internalServerErrorKeys,
    error?: unknown,
  ) {
    return this.exception(HttpStatus.INTERNAL_SERVER_ERROR, keys, error);
  }

  notImplemented(keys: HttpExceptionKeys = defaultKeys.notImplementedKeys, error?: unknown) {
    return this.exception(HttpStatus.NOT_IMPLEMENTED, keys, error);
  }

  badGateway(keys: HttpExceptionKeys = defaultKeys.badGatewayKeys, error?: unknown) {
    return this.exception(HttpStatus.BAD_GATEWAY, keys, error);
  }

  serviceUnavailable(
    keys: HttpExceptionKeys = defaultKeys.serviceUnavailableKeys,
    error?: unknown,
  ) {
    return this.exception(HttpStatus.SERVICE_UNAVAILABLE, keys, error);
  }

  gatewayTimeout(keys: HttpExceptionKeys = defaultKeys.gatewayTimeoutKeys, error?: unknown) {
    return this.exception(HttpStatus.GATEWAY_TIMEOUT, keys, error);
  }

  tooManyRequests(keys: HttpExceptionKeys = defaultKeys.tooManyRequestsKeys, error?: unknown) {
    return this.exception(HttpStatus.TOO_MANY_REQUESTS, keys, error);
  }

  versionNotSupported(
    keys: HttpExceptionKeys = defaultKeys.versionNotSupportedKeys,
    error?: unknown,
  ) {
    return this.exception(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, keys, error);
  }

  preconditionFailed(
    keys: HttpExceptionKeys = defaultKeys.preconditionFailedKeys,
    error?: unknown,
  ) {
    return this.exception(HttpStatus.PRECONDITION_FAILED, keys, error);
  }

  exception(status: HttpStatus, keys: HttpExceptionKeys, error?: unknown) {
    const response = {
      statusCode: status,
      error: this.isProduction ? undefined : error,
      ...keys,
    };
    return new HttpException(response, status);
  }
}

const defaultKeys = {
  badRequestKeys: {
    titleKey: 'httpException.badRequest.title',
    messageKey: 'httpException.badRequest.message',
  },

  unauthorizedKeys: {
    titleKey: 'httpException.unauthorized.title',
    messageKey: 'httpException.unauthorized.message',
  },

  forbiddenKeys: {
    titleKey: 'httpException.forbidden.title',
    messageKey: 'httpException.forbidden.message',
  },

  notFoundKeys: {
    titleKey: 'httpException.notFound.title',
    messageKey: 'httpException.notFound.message',
  },

  conflictKeys: {
    titleKey: 'httpException.conflict.title',
    messageKey: 'httpException.conflict.message',
  },
  unprocessableEntityKeys: {
    titleKey: 'httpException.unprocessableEntity.title',
    messageKey: 'httpException.unprocessableEntity.message',
  },

  internalServerErrorKeys: {
    titleKey: 'httpException.internalServerError.title',
    messageKey: 'httpException.internalServerError.message',
  },

  notImplementedKeys: {
    titleKey: 'httpException.notImplemented.title',
    messageKey: 'httpException.notImplemented.message',
  },

  badGatewayKeys: {
    titleKey: 'httpException.badGateway.title',
    messageKey: 'httpException.badGateway.message',
  },
  serviceUnavailableKeys: {
    titleKey: 'httpException.serviceUnavailable.title',
    messageKey: 'httpException.serviceUnavailable.message',
  },
  gatewayTimeoutKeys: {
    titleKey: 'httpException.gatewayTimeout.title',
    messageKey: 'httpException.gatewayTimeout.message',
  },
  tooManyRequestsKeys: {
    titleKey: 'httpException.tooManyRequests.title',
    messageKey: 'httpException.tooManyRequests.message',
  },
  versionNotSupportedKeys: {
    titleKey: 'httpException.versionNotSupported.title',
    messageKey: 'httpException.versionNotSupported.message',
  },
  preconditionFailedKeys: {
    titleKey: 'httpException.preconditionFailed.title',
    messageKey: 'httpException.preconditionFailed.message',
  },
};
