import { Module } from '@nestjs/common';
import { GoogleService } from './service';
import { GoogleController } from './controller';
import { EnvironmentModule } from '@edd/config/module/environment';
import { registerJwtModule, registerMinioModule } from '@edd/config';
import { UserModule } from '@edd/common/module/user';

@Module({
  imports: [EnvironmentModule, UserModule, registerJwtModule(), registerMinioModule()],
  providers: [GoogleService],
  controllers: [GoogleController],
})
export class GoogleModule {}
