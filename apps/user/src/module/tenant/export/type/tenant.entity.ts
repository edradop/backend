import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/export';
import { Role } from '../../../role/export';
import { Authority } from '../../../authority/export';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Length(3, 50)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Length(3, 50)
  @IsNotEmpty()
  @Column({ unique: true, type: 'varchar', length: 50 })
  code!: string;

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];

  @OneToMany(() => Role, (role) => role.tenant)
  roles!: Role[];

  @OneToMany(() => Authority, (authority) => authority.tenant)
  authorities!: Authority[];

  @ManyToOne(() => User, (user) => user.ownRoles)
  owner!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
