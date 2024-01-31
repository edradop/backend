import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ClientOptions } from 'minio';
import { MinioConfig } from '../type';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<ClientOptions>()
    .setExtras<MinioConfig>({ isGlobal: false }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();

export { ConfigurableModuleClass };
export { MODULE_OPTIONS_TOKEN };
export { OPTIONS_TYPE };
export { ASYNC_OPTIONS_TYPE };
