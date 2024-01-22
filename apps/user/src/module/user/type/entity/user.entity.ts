import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Username } from './username.entity';
import { Password } from './password.entity';
import { Email } from './email.entity';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  @IsNotEmpty()
  @Length(3, 50)
  firstName!: string;

  @Column({ type: 'varchar', length: 50 })
  @Length(3, 50)
  @IsNotEmpty()
  lastName!: string;

  @OneToOne(() => Email, (email) => email.user)
  email!: Email;

  @OneToOne(() => Password, (password) => password.user)
  password!: Password;

  @OneToOne(() => Username, (username) => username.user)
  username!: Username;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  generateUsername(): void {
    const randomString = Math.random().toString(36).substring(2, 17); // Generates a random 15-character string
    if (!this.username) {
      this.username = { username: `${this.firstName.substring(0, 5)}${randomString}` } as Username;
    }
  }
}
