import { PasswordValidation, UsernameValidation } from '@edd/common';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Authority } from '../../../authority';
import { Role } from '../../../role';
import { UserType } from '../enum/user-type.enum';

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

  @Column({ nullable: true })
  @Length(0, 500)
  bio!: string;

  @OneToMany(() => Role, (role) => role.owner)
  ownRoles!: Role[];

  @OneToMany(() => Authority, (authority) => authority.owner)
  ownAuthorities!: Authority[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles!: Role[];

  // Optional: Direct relationship with Authority
  @ManyToMany(() => Authority, (authority) => authority.users)
  @JoinTable()
  authorities?: Authority[];

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: true,
  })
  status!: UserType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  generateUsername(): void {
    // Generates a random 15-character string
    const randomString = Math.random().toString(36).substring(2, 17);
    if (!this.username) {
      this.username = `${this.firstName.substring(0, 5)}${randomString}`;
    }
  }
}
