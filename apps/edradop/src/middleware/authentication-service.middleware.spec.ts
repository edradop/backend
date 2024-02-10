import { HttpEnvironmentService } from '@edd/config/module/environment';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationServiceMiddleware } from './authentication-service.middleware';

describe('AuthenticationServiceMiddleware', () => {
  let httpEnvironmentService: HttpEnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpEnvironmentService],
    }).compile();

    httpEnvironmentService = module.get<HttpEnvironmentService>(HttpEnvironmentService);
  });

  it('should be defined', () => {
    expect(new AuthenticationServiceMiddleware(httpEnvironmentService)).toBeDefined();
  });
});
