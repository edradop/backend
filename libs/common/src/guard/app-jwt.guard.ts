import { APP_GUARD } from '@nestjs/core';
import { JwtAuthenticationGuard } from './jwt-authentication.guard';

const appJwtGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthenticationGuard,
};

export { appJwtGuard };
