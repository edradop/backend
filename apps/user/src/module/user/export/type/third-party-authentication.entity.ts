import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ThirdPartyName } from '../../type/third-party-name.enum';

@Entity()
export class ThirdPartyAuthentication {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: ThirdPartyName,
    nullable: false,
  })
  name!: ThirdPartyName;

  @ManyToOne(() => User, (user) => user.thirdParties)
  user!: User;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
