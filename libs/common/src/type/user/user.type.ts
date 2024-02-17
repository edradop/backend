import { TAuthority } from './authority.type';
import { TRole } from './role.type';

type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
  profilePhoto: string;
  authorities: string[] | TAuthority[];
  status: string;
  ownAuthorities: string[] | TAuthority[];
  roles: TRole[];
  ownRoles: TRole[];
  createdAt: Date;
  updatedAt: Date;
};

export { TUser };
