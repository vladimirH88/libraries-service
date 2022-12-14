import { Author } from 'src/author/entities/author.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Library } from 'src/library/entities/library.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books', { schema: 'libraries' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isbn: string;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
