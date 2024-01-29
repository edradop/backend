import { Module } from '@nestjs/common';
import { StorageController } from './controller';
import { StorageService } from './service';
import { ConfigModule } from '@nestjs/config';
import { PortModule } from '@edd/config/module/port';

@Module({
  imports: [ConfigModule.forRoot(), PortModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
