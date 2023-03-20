import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Library } from '@entities/library.entity';

import { AbstractEntity } from './absrtact.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  surname: string;

  @CreateDateColumn()
  registration_date: Date;

  @Column({ default: false })
  block: boolean;

  @Column({ default: null, nullable: true })
  block_date: Date;

  @Column({ default: null, nullable: true })
  block_reason: string;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;
}
