import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} from '@edd/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
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
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
