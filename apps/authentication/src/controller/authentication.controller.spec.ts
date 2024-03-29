import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from '../service';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    authenticationController = app.get<AuthenticationController>(AuthenticationController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        authenticationController.login({
          email: 'johndoe@example.com',
          password: 'yourSecureP@ssw0rd',
        }),
      ).toContain({ accessToken: expect.any(String), refreshToken: expect.any(String) });
    });
  });
});
