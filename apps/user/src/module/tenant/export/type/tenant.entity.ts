import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/export';

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

  @ManyToOne(() => User, (user) => user.ownRoles)
  owner!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
