import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from '../definition';
import { MinioClient, MinioCopyConditions } from '../type';
import { createMinioClient, createCopyConditions } from '../util';
import * as crypto from 'crypto';
import { Readable } from 'stream';

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

  public async uploadImage(file: Express.Multer.File, bucketName: string) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('File type not supported', HttpStatus.BAD_REQUEST);
    }
    const timestamp = Date.now().toString();
    const hashedFileName = crypto.createHash('md5').update(timestamp).digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };

    // We need to append the extension at the end otherwise Minio will save it as a generic file
    const fileName = hashedFileName + extension;
    await this.client.putObject(bucketName, fileName, file.buffer, metaData);
    return fileName;
  }

  generateUrl(host: string, port: number, bucketName: string, fileName: string) {
    return `${host}:${port}/${bucketName}/${fileName}`;
  }

  createMulterFileObject(buffer: Readable, filename: string, mimetype: string, size: number) {
    // Assuming `buffer` is your Buffer instance, and `filename` & `mimetype` are strings
    const multerFile = {
      fieldname: 'file', // This should match the name of the form field used to upload the file
      originalname: filename,
      mimetype: mimetype,
      size: size,
      buffer: buffer,
      destination: 'undefined',
      filename: filename,
      path: 'undefined',
    } as unknown;
    return multerFile as Express.Multer.File;
  }

  async delete(objetName: string, bucketName: string) {
    await this.client.removeObject(bucketName, objetName);
  }
}
