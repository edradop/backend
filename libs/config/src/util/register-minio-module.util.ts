import { DynamicModule } from '@nestjs/common';
import { EnvironmentModule, EnvironmentService } from '../module/environment';
import { ClientOptions } from 'minio';
import { MinioConfig, MinioModule } from '@edd/common/module/minio';

const registerMinioModule = (): DynamicModule => {
  return MinioModule.registerAsync({
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: (environmentService: EnvironmentService) => {
      return {
        endPoint: environmentService.minioEndpoint,
        port: environmentService.minioPort,
        useSSL: environmentService.minioUseSSL,
        accessKey: environmentService.minioAccessKey,
        secretKey: environmentService.minioSecretKey,
      } as ClientOptions & Partial<MinioConfig>;
    },
  });
};

export { registerMinioModule };
