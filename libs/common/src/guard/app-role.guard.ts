import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role.guard';

const appRoleGuard = {
  provide: APP_GUARD,
  useClass: RoleGuard,
};

export { appRoleGuard };
