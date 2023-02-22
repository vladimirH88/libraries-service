import { Library } from 'src/entityes/library.entity';
import { Position } from 'src/entityes/position.entity';
import { Role } from 'src/entityes/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('employees')
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

  @Column({ nullable: true })
  refresh_token: string;
}
