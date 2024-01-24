import { JWT_SECRET, UserModule } from '@edd/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthenticationGuard } from './guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthenticationGuard,
    },
  ],
})
export class AuthenticationModule {}
