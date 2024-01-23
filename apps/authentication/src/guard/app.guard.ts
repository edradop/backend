import { APP_GUARD as GUARD } from '@nestjs/core';
import { JwtAuthenticationGuard } from './jwt-authentication.guard';

export const APP_GUARD = {
  provide: GUARD,
  useClass: JwtAuthenticationGuard,
};
