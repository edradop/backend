import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionService } from './http-exception.service';

describe('HttpExceptionService', () => {
  let service: HttpExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionService],
    }).compile();

    service = module.get<HttpExceptionService>(HttpExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
