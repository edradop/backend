import { JWT_SECRET, UserModule } from '@edd/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './controller';
import { AuthenticationService } from './service';
import { JwtStrategy } from './strategy';
import { APP_GUARD } from './guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, APP_GUARD],
})
export class AuthenticationModule {}
