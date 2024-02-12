import { CacheModule } from '@nestjs/cache-manager';
import { DynamicModule } from '@nestjs/common';
import type { RedisClientOptions } from 'redis';
import { EnvironmentModule, EnvironmentService } from '../module/environment';

const registerCacheModule = (): DynamicModule => {
  return CacheModule.registerAsync<RedisClientOptions>({
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: async (environmentService: EnvironmentService) => ({
      // store: ,
      host: environmentService.cacheHost,
      port: environmentService.cachePort,
      ttl: environmentService.cacheTtl,
    }),
  });
};

export { registerCacheModule };
