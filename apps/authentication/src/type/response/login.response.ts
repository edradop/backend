import { TUser } from '@edd/common/module/user';

type LoginResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export { LoginResponse };
