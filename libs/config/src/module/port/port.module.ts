import { Module } from '@nestjs/common';
import { PortService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [PortService],
  exports: [PortService],
})
export class PortModule {}
