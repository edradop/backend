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
import { Role } from '../../../role/export';
import { Authority } from '../../../authority/export';
import { UserType } from '@edd/common/module/user';
import { ThirdPartyAuthentication } from './third-party-authentication.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsNotEmpty()
  @Length(3, 50)
  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName?: string;

  @Length(3, 50)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true, nullable: true })
  email?: string;

  @PasswordValidation()
  @Column({ select: false, nullable: true })
  password?: string;

  @PasswordValidation()
  @Column({ default: false, nullable: true })
  isHasPassword?: boolean;

  @UsernameValidation()
  @Column({ type: 'varchar', length: 20, nullable: true })
  username!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Length(0, 500)
  bio!: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Length(0, 500)
  profilePhoto?: string;

  @OneToMany(() => Role, (role) => role.owner)
  ownRoles!: Role[];

  @OneToMany(() => Authority, (authority) => authority.owner)
  ownAuthorities!: Authority[];

  @OneToMany(() => ThirdPartyAuthentication, (thirdParty) => thirdParty.user)
  thirdParties!: ThirdPartyAuthentication[];

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
  status?: UserType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeInsert()
  generateUsername(): void {
    // Generates a random 15-character string
    const randomString = Math.random().toString(36).substring(2, 17);
    if (!this.username) {
      this.username = `${this.firstName?.substring(0, 5)}${randomString}`;
    }
  }
}
