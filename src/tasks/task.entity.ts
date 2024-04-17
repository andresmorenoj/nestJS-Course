import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TASKS_STATUS } from './task-status.enum';
import { User } from 'src/auth/user.entity';

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

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
