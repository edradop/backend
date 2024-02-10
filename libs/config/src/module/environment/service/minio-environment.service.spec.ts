import { Test, TestingModule } from '@nestjs/testing';
import { MinioEnvironmentService } from './minio-environment.service';

describe('MinioEnvironmentService', () => {
  let service: MinioEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinioEnvironmentService],
    }).compile();

    service = module.get<MinioEnvironmentService>(MinioEnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
