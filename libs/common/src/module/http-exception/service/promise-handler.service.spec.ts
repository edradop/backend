import { Test, TestingModule } from '@nestjs/testing';
import { PromiseHandlerService } from './promise-handler.service';

describe('PromiseHandlerService', () => {
  let service: PromiseHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromiseHandlerService],
    }).compile();

    service = module.get<PromiseHandlerService>(PromiseHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
