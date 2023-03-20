import { Column, Entity } from 'typeorm';

import { AbstractEntity } from './absrtact.entity';

@Entity('genres')
export class Genre extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
