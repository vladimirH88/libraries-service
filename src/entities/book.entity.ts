import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Author } from '@entities/author.entity';
import { Genre } from '@entities/genre.entity';
import { Library } from '@entities/library.entity';

import { AbstractEntity } from './absrtact.entity';

@Entity('books')
export class Book extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  isbn: string;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;

  @Column()
  library_id: string;

  @ManyToOne(() => Genre)
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @Column()
  genre_id: string;

  @ManyToOne(() => Author)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @Column()
  author_id: string;
}
