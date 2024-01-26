import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Authority } from '../../../authority/type/entity/authority.entity';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
export class Role {
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

  @ManyToMany(() => Authority)
  @JoinTable()
  authorities!: Authority[];
}
