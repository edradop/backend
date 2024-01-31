import { Module } from '@nestjs/common';
import { StorageController } from './controller';
import { StorageService } from './service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentModule } from '@edd/config/module/environment';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
