import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from '../definition';
import { MinioClient, MinioCopyConditions } from '../type';
import { createMinioClient, createCopyConditions } from '../util';

@Injectable()
export class MinioService {
  private readonly minioSdk: MinioClient;
  private readonly copyConditionsImplementation: MinioCopyConditions;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE) {
    this.minioSdk = createMinioClient(this.options);
    this.copyConditionsImplementation = createCopyConditions();
  }

  public get client(): MinioClient {
    return this.minioSdk;
  }

  public get copyConditions(): MinioCopyConditions {
    return this.copyConditionsImplementation;
  }
}
