import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_CLIENT_PROXY } from '../../constant';
import { EnvironmentModule, HttpEnvironmentService } from '../../module/environment';

const registerAuthenticationClient = (): ClientsProviderAsyncOptions => {
  return {
    name: AUTHENTICATION_CLIENT_PROXY,
    imports: [EnvironmentModule],
    inject: [HttpEnvironmentService],
    useFactory: async (httpEnvironmentService: HttpEnvironmentService) => ({
      transport: Transport.TCP,
      options: {
        host: httpEnvironmentService.authenticationHost,
        port: httpEnvironmentService.authenticationPort,
      },
    }),
  };
};

export { registerAuthenticationClient };
