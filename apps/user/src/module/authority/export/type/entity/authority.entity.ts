import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../../../role/export';
import { User } from '../../../../user/export';

@Entity()
class Authority {
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

  // Optional: Direct relationship with User
  @ManyToMany(() => User, (user) => user.authorities)
  users?: User[];

  @ManyToOne(() => User, (user) => user.ownAuthorities)
  owner!: User;

  @ManyToMany(() => Role, (role) => role.authorities)
  roles!: Role[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Authority };
