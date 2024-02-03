import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception.filter';

const appExceptionFilter = {
  provide: APP_FILTER,
  useClass: HttpExceptionFilter,
};

export { appExceptionFilter };
