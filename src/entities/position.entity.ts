import { Column, Entity } from 'typeorm';

import { AbstractEntity } from './absrtact.entity';

@Entity('positions')
export class Position extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
