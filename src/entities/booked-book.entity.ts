import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from './absrtact.entity';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity('booked-book')
export class BookedBook extends AbstractEntity {
  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  book_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @Column({ default: true })
  relevant: boolean;

  @Column({ nullable: true, default: null })
  issue_date: Date;
}
