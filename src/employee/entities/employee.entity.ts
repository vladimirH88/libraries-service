import { Library } from 'src/library/entities/library.entity';
import { Position } from 'src/position/entities/position.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column()
  email: string;

  @ManyToOne(() => Position)
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @ManyToOne(() => Library)
  @JoinColumn({ name: 'library_id' })
  library: Library;

  @CreateDateColumn()
  employment_date: Date;

  @Column({ nullable: true })
  fired_date: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  login: string;

  @Column({ default: false })
  active: boolean;
}
