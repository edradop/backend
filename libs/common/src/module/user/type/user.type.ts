import { TRole } from './role.type';

type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  authorities: string[];
  roles: TRole[];
  createdAt: Date;
  updatedAt: Date;
};

export { TUser };
