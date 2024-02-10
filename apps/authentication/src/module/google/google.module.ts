import { registerJwtModule, registerMinioModule } from '@edd/config';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { GoogleController } from './controller';
import { GoogleService } from './service';

@Module({
  imports: [EnvironmentModule, registerJwtModule(), registerMinioModule()],
  providers: [GoogleService],
  controllers: [GoogleController],
})
export class GoogleModule {}
