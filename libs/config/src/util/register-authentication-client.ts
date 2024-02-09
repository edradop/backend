import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_CLIENT_PROXY } from '../constant';
import { EnvironmentModule, EnvironmentService } from '../module/environment';

const registerAuthenticationClient = (): ClientsProviderAsyncOptions => {
  return {
    name: AUTHENTICATION_CLIENT_PROXY,
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: async (environmentService: EnvironmentService) => ({
      transport: Transport.TCP,
      options: {
        host: environmentService.authenticationHost,
        port: environmentService.authenticationPort,
      },
    }),
  };
};

export { registerAuthenticationClient };
