import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Authority } from '../../../authority/export';
import { User } from '../../../user/export';

@Entity()
export class Role {
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

  @ManyToMany(() => Authority, (authority) => authority.roles)
  @JoinTable()
  authorities!: Authority[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
