import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';

import { TASKS_STATUS } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  private notFoundException = (id: string) =>
    new NotFoundException(`Task with ID "${id}" not found`);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw this.notFoundException(id);
    }

    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TASKS_STATUS.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw this.notFoundException(id);
    }
  }

  async updateTaskStatusById(id: string, status: TASKS_STATUS): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    this.tasksRepository.save(task);
    return task;
  }
}
