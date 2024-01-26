import { Module } from '@nestjs/common';
import { StorageController } from './controller';
import { StorageService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
