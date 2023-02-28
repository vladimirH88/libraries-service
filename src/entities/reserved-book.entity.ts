import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '@entities/book.entity';
import { User } from '@entities/user.entity';

@Entity('reserved_books')
export class ReservedBook {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  reserved_from: Date;

  @Column()
  reserved_to: Date;

  @Column({ nullable: true })
  return_date: Date;

  @Column({ default: false })
  returned: boolean;
}
