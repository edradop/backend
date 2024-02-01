import { UsernameValidation } from '@edd/common';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../export/type/user.entity';

@Entity()
export class Username {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @UsernameValidation()
  username!: string;

  @OneToOne(() => User, (user) => user.password)
  @JoinColumn()
  user!: User;
}