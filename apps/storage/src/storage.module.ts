import { appFreezePipe } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { registerJwtModule, registerMinioModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageController } from './controller';
import { StorageService } from './service';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule, registerJwtModule(), registerMinioModule()],
  controllers: [StorageController],
  providers: [StorageService, appFreezePipe, appJwtGuard],
})
export class StorageModule {}
