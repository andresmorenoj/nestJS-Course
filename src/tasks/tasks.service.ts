import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { ITask, TASKS_STATUS } from './task.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TASKS_STATUS.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatusById(id: string, status: TASKS_STATUS): ITask {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
