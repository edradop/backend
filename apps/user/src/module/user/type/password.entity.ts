import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../export/type';
import { PasswordValidation } from '@edd/common';

@Entity()
export class Password {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ select: false })
  @PasswordValidation()
  password!: string;

  @OneToOne(() => User, (user) => user.password)
  @JoinColumn()
  user!: User;
}
