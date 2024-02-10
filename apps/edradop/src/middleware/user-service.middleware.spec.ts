import { HttpEnvironmentService } from '@edd/config/module/environment';
import { TestingModule, Test } from '@nestjs/testing';
import { UserServiceMiddleware } from './user-service.middleware';

describe('UserServiceMiddleware', () => {
  let httpEnvironmentService: HttpEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpEnvironmentService],
    }).compile();

    httpEnvironmentService = module.get<HttpEnvironmentService>(HttpEnvironmentService);
  });
  it('should be defined', () => {
    expect(new UserServiceMiddleware(httpEnvironmentService)).toBeDefined();
  });
});
