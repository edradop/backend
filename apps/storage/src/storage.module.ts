import { registerMinioModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageController } from './controller';
import { StorageService } from './service';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule, registerMinioModule()],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
