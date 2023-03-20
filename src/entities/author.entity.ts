import { Column, Entity } from 'typeorm';

import { AbstractEntity } from './absrtact.entity';

@Entity('authors')
export class Author extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  surname: string;
}
