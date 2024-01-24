import { Entity } from 'typeorm';

@Entity()
class Authority {
  id!: string;
  name!: string;
  code!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export { Authority };
