import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './service';
import { HttpExceptionModule } from '../http-exception';

@Module({
  imports: [ConfigModule, HttpExceptionModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
