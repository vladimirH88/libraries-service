import { Column, Entity } from 'typeorm';

import { AbstractEntity } from './absrtact.entity';

@Entity('roles')
export class Role extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;
}
