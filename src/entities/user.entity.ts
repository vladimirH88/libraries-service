import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Exclude } from 'class-transformer';

import { AbstractEntity } from './absrtact.entity';
import { Role } from './role.entity';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  surname: string;

  @Column({ default: false })
  block: boolean;

  @Column({ default: null, nullable: true })
  block_date: Date;

  @Column({ default: null, nullable: true })
  block_reason: string;

  @Column()
  email: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  login: string;

  @Exclude()
  @Column({ nullable: true })
  refresh_token: string;
}
