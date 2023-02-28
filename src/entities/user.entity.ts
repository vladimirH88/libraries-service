import { Library } from '@entities/library.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  patronymic: string;

  @Column()
  surname: string;

  @CreateDateColumn()
  registration_date: Date;

  @Column({ default: false })
  block: boolean;

  @Column({ default: null, nullable: true })
  block_date: Date;

  @Column({ default: null, nullable: true })
  block_reason: string;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;
}
