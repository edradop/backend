import { APP_PIPE } from '@nestjs/core';
import { FreezePipe } from './freeze.pipe';

const appFreezePipe = {
  provide: APP_PIPE,
  useClass: FreezePipe,
};

export { appFreezePipe };
