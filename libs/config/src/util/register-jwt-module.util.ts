import { DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentModule, EnvironmentService } from '../module/environment';

const registerJwtModule = (): DynamicModule => {
  return JwtModule.registerAsync({
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: async (environmentService: EnvironmentService) => ({
      secret: environmentService.jwtSecret,
      signOptions: { expiresIn: environmentService.jwtExpiresIn },
    }),
  });
};

export { registerJwtModule };
