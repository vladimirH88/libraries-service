import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Library } from '@entities/library.entity';
import { Position } from '@entities/position.entity';
import { Role } from '@entities/role.entity';

import { Exclude } from 'class-transformer';

import { AbstractEntity } from './absrtact.entity';

@Entity('employees')
export class Employee extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  patronymic: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @ManyToOne(() => Position)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @Column()
  position_id: string;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;

  @Column()
  library_id: string;

  @CreateDateColumn()
  employment_date: Date;

  @Column({ nullable: true })
  fired_date: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  login: string;

  @Column({ default: false })
  active: boolean;

  @Exclude()
  @Column({ nullable: true })
  refresh_token: string;
}
