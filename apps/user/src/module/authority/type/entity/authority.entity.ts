import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

export { Authority };
