import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ANALYTIC,
  ANALYTIC_DEFAULT_PORT,
  AUTHENTICATION,
  AUTHENTICATION_DEFAULT_PORT,
  COMMUNICATION,
  PAYMENT,
  PAYMENT_DEFAULT_PORT,
  STORAGE,
  STORAGE_DEFAULT_PORT,
  USER,
  USER_DEFAULT_PORT,
} from 'edd/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: ANALYTIC,
        transport: Transport.TCP,
        options: { port: ANALYTIC_DEFAULT_PORT },
      },
      {
        name: AUTHENTICATION,
        transport: Transport.TCP,
        options: { port: AUTHENTICATION_DEFAULT_PORT },
      },
      {
        name: COMMUNICATION,
        transport: Transport.TCP,
      },
      {
        name: PAYMENT,
        transport: Transport.TCP,
        options: { port: PAYMENT_DEFAULT_PORT },
      },
      {
        name: STORAGE,
        transport: Transport.TCP,
        options: { port: STORAGE_DEFAULT_PORT },
      },
      {
        name: USER,
        transport: Transport.TCP,
        options: { port: USER_DEFAULT_PORT },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
