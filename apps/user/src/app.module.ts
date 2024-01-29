import {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  registerJwtModule,
} from '@edd/common';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorityModule } from './module/authority';
import { RoleModule } from './module/role';
import { UserModule } from './module/user';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpExceptionModule,
    registerJwtModule(),
    typeOrm(),
    UserModule,
    RoleModule,
    AuthorityModule,
  ],
  providers: [appJwtGuard],
  exports: [],
})
export class AppModule {}

function typeOrm() {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get(POSTGRES_HOST),
        port: configService.get(POSTGRES_PORT),
        username: configService.get(POSTGRES_USER),
        password: configService.get(POSTGRES_PASSWORD),
        database: configService.get(POSTGRES_DATABASE),
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      };
    },
    inject: [ConfigService],
  });
}
