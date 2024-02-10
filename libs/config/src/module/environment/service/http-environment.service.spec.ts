import { Test, TestingModule } from '@nestjs/testing';
import { HttpEnvironmentService } from './http-environment.service';

describe('HttpEnvironmentService', () => {
  let service: HttpEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpEnvironmentService],
    }).compile();

    service = module.get<HttpEnvironmentService>(HttpEnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
