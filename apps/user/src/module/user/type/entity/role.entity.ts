import { Entity } from 'typeorm';
import { Authority } from './authority.entity';

@Entity()
export class Role {
  id!: string;
  name!: string;
  code!: string;
  authorities!: Authority[];
  createdAt!: Date;
  updatedAt!: Date;
}
