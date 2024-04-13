import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { ITask, TASKS_STATUS } from './task.module';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(title: ITask['title'], description: ITask['description']): ITask {
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TASKS_STATUS.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
