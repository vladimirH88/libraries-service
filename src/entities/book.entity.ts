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
