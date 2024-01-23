import { PasswordValidation, UsernameValidation } from '@edd/common';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsNotEmpty()
  @Length(3, 50)
  @Column({ type: 'varchar', length: 50 })
  firstName!: string;

  @Length(3, 50)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email!: string;

  @PasswordValidation()
  @Column({ select: false })
  password!: string;

  @UsernameValidation()
  @Column()
  username!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  generateUsername(): void {
    // Generates a random 15-character string
    const randomString = Math.random().toString(36).substring(2, 17);
    if (!this.username) {
      this.username = `${this.firstName.substring(0, 5)}${randomString}`;
    }
  }
}
