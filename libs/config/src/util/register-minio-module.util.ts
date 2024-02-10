import { MinioConfig, MinioModule } from '@edd/common/module/minio';
import { DynamicModule } from '@nestjs/common';
import { ClientOptions } from 'minio';
import { EnvironmentModule, MinioEnvironmentService } from '../module/environment';

const registerMinioModule = (): DynamicModule => {
  return MinioModule.registerAsync({
    imports: [EnvironmentModule],
    inject: [MinioEnvironmentService],
    useFactory: (minioEnvironmentService: MinioEnvironmentService) => {
      return {
        endPoint: minioEnvironmentService.minioEndpoint,
        port: minioEnvironmentService.minioPort,
        useSSL: minioEnvironmentService.minioUseSSL,
        accessKey: minioEnvironmentService.minioAccessKey,
        secretKey: minioEnvironmentService.minioSecretKey,
      } as ClientOptions & Partial<MinioConfig>;
    },
  });
};

export { registerMinioModule };
