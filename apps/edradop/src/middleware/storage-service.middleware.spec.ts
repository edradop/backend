import { HttpEnvironmentService } from '@edd/config/module/environment';
import { TestingModule, Test } from '@nestjs/testing';
import { StorageServiceMiddleware } from './storage-service.middleware';

describe('StorageServiceMiddleware', () => {
  let httpEnvironmentService: HttpEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpEnvironmentService],
    }).compile();

    httpEnvironmentService = module.get<HttpEnvironmentService>(HttpEnvironmentService);
  });

  it('should be defined', () => {
    expect(new StorageServiceMiddleware(httpEnvironmentService)).toBeDefined();
  });
});
