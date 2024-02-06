import { TAuthority, TUser } from '@edd/common/module/user';
import { EnvironmentService } from '@edd/config/module/environment';
import { JwtService } from '@nestjs/jwt';

const generateToken = async (
  user: TUser,
  jwtService: JwtService,
  environmentService: EnvironmentService,
) => {
  const data = {
    id: user.id,
    profilePhoto: user.profilePhoto,
    username: user.username,
    email: user.email,
    authorities: user.authorities?.map((item: unknown) => (item as TAuthority).code),
    roles: user.roles,
  };
  const accessToken = jwtService.sign(data, {
    expiresIn: environmentService.jwtExpiresIn,
    secret: environmentService.jwtSecret,
  });
  const refreshToken = jwtService.sign(data, {
    expiresIn: environmentService.jwtRefreshExpiresIn,
    secret: environmentService.jwtRefreshSecret,
  });
  const decodedAccessToken = jwtService.decode(accessToken);
  const decodedRefreshToken = jwtService.decode(refreshToken);
  return {
    accessToken,
    refreshToken,
    accessTokenExp: decodedAccessToken['exp'],
    refreshTokenExp: decodedRefreshToken['exp'],
  };
};

export { generateToken };