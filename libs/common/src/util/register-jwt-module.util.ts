import { JwtModule } from '@nestjs/jwt';
import { DynamicModule } from '@nestjs/common';
import { JWT_SECRET } from '@edd/config';

const registerJwtModule = (): DynamicModule => {
  return JwtModule.register({
    secret: JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  });
};

export { registerJwtModule };
