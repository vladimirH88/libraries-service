import { Entity, Column } from 'typeorm';

import { AbstractEntity } from './absrtact.entity';

@Entity('libraries')
export class Library extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;
}
