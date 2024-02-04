import { appFreezePipe, registerJwtModule } from '@edd/common';
import { appJwtGuard } from '@edd/common/guard/app-jwt.guard';
import { UserModule } from '@edd/common/module/user';
import { EnvironmentModule } from '@edd/config/module/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentModule, registerJwtModule(), UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, appJwtGuard, appFreezePipe],
})
export class AuthenticationModule {}
