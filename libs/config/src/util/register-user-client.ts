import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { USER_CLIENT_PROXY } from '../constant';
import { EnvironmentModule, EnvironmentService } from '../module/environment';

const registerUserClient = (): ClientsProviderAsyncOptions => {
  return {
    name: USER_CLIENT_PROXY,
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: async (environmentService: EnvironmentService) => ({
      transport: Transport.TCP,
      options: { host: environmentService.userHost, port: environmentService.userPort },
    }),
  };
};

export { registerUserClient };
