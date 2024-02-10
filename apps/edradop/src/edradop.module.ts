import { EnvironmentModule } from '@edd/config/module/environment';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AnalyticServiceMiddleware,
  AuthenticationServiceMiddleware,
  PaymentServiceMiddleware,
  StorageServiceMiddleware,
  UserServiceMiddleware,
} from './middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentModule,
    // ThrottlerModule.forRoot([
    //   {
    //     name: 'short',
    //     ttl: 1000,
    //     limit: 3,
    //   },
    //   {
    //     name: 'medium',
    //     ttl: 10000,
    //     limit: 20,
    //   },
    //   {
    //     name: 'long',
    //     ttl: 60000,
    //     limit: 100,
    //   },
    // ]),
  ],
  controllers: [],
  providers: [],
})
export class EdradopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AnalyticServiceMiddleware)
      .forRoutes({ path: 'analytic/*', method: RequestMethod.ALL });
    consumer
      .apply(AuthenticationServiceMiddleware)
      .forRoutes({ path: 'authentication/*', method: RequestMethod.ALL });
    consumer
      .apply(PaymentServiceMiddleware)
      .forRoutes({ path: 'payment/*', method: RequestMethod.ALL });
    consumer
      .apply(StorageServiceMiddleware)
      .forRoutes({ path: 'storage/*', method: RequestMethod.ALL });
    consumer.apply(UserServiceMiddleware).forRoutes({ path: 'user/*', method: RequestMethod.ALL });
  }
}
