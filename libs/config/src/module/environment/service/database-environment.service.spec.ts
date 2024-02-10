import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseEnvironmentService } from './database-environment.service';

describe('DatabaseEnvironmentService', () => {
  let service: DatabaseEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseEnvironmentService],
    }).compile();

    service = module.get<DatabaseEnvironmentService>(DatabaseEnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
