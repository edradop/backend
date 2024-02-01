import { TRole } from './role.type';

type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
  profilePhoto: string;
  authorities: string[];
  status: string;
  ownAuthorities: string[];
  roles: TRole[];
  ownRoles: TRole[];
  createdAt: Date;
  updatedAt: Date;
};

export { TUser };
