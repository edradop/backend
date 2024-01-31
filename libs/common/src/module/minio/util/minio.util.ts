import * as Minio from 'minio';
import { OPTIONS_TYPE } from '../definition';
import { MinioClient, MinioCopyConditions } from '../type';

function createMinioClient(options: typeof OPTIONS_TYPE): MinioClient {
  const client = new Minio.Client(options);

  return client;
}

function createCopyConditions(): MinioCopyConditions {
  const copyConditions = new Minio.CopyConditions();

  return copyConditions;
}

export { createMinioClient };
export { createCopyConditions };
