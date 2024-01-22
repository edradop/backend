import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity()
export class Email {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @OneToOne(() => User, (user) => user.email)
  @JoinColumn()
  user!: User;
}
