import * as Minio from 'minio';
type MinioConfig = {
  isGlobal?: boolean;
};

type MinioClient = Minio.Client;
type MinioCopyConditions = Minio.CopyConditions;

export { MinioConfig };
export { MinioClient };
export { MinioCopyConditions };
