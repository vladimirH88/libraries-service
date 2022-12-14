import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reserved_books', { schema: 'libraries' })
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
