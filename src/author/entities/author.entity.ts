import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authors', { schema: 'libraries' })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  surname: string;
}
