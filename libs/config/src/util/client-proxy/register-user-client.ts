import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { USER_CLIENT_PROXY } from '../../constant';
import { EnvironmentModule, HttpEnvironmentService } from '../../module/environment';

const registerUserClient = (): ClientsProviderAsyncOptions => {
  return {
    name: USER_CLIENT_PROXY,
    imports: [EnvironmentModule],
    inject: [HttpEnvironmentService],
    useFactory: async (httpEnvironmentService: HttpEnvironmentService) => ({
      transport: Transport.TCP,
      options: { host: httpEnvironmentService.userHost, port: httpEnvironmentService.userPort },
    }),
  };
};

export { registerUserClient };
