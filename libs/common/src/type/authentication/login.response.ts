import { TUser } from '@edd/common/type/user';

type LoginResponse = {
  user?: TUser;
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
};

export { LoginResponse };
