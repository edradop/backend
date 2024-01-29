import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../constant';
import { DynamicModule } from '@nestjs/common';

const registerJwtModule = (): DynamicModule => {
  return JwtModule.register({
    secret: JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  });
};

export { registerJwtModule };
