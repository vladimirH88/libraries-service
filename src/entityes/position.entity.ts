import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('positions', { schema: 'libraries' })
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
