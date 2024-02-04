import { UsernameValidation } from '@edd/common';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '.';

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
