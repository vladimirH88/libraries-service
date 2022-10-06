import { Library } from 'src/library/entities/library.entity';
import { Position } from 'src/position/entities/position.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employees', { schema: 'libraries' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  patronymic: string;

  @Column()
  surname: string;

  @OneToOne(() => Position)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;

  @CreateDateColumn()
  employment_date: Date;

  @Column({ nullable: true })
  fired_date: Date;
}
