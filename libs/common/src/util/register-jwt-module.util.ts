import { JwtModule } from '@nestjs/jwt';
import { DynamicModule } from '@nestjs/common';
import { JWT_DEFAULT_SECRET, JWT_DEFAULT_EXPIRES_IN } from '@edd/config';

const registerJwtModule = (): DynamicModule => {
  return JwtModule.register({
    secret: JWT_DEFAULT_SECRET,
    signOptions: { expiresIn: JWT_DEFAULT_EXPIRES_IN },
  });
};

export { registerJwtModule };
