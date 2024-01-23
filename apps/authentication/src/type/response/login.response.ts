import { TUser } from '@edd/common';

type LoginResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export { LoginResponse };
