import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('libraries')
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;
}
