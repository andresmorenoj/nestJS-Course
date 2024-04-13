import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TASKS_STATUS } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TASKS_STATUS;
}
