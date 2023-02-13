import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genres', { schema: 'libraries' })
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
