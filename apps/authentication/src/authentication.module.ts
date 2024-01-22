import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './module/token/token.module';

@Module({
  imports: [ConfigModule.forRoot(), TokenModule],
})
export class AuthenticationModule {}
