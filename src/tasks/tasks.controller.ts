import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask, TASKS_STATUS } from './task.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
    // If we have any filters defined, call tasksService.getTasksFilter
    // other wise just get all tasks

    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // tasks/id
  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  // This will pass all the body to the method and requires extra validation for unknown properties in the body
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('status') status: TASKS_STATUS,
  ): ITask {
    return this.tasksService.updateTaskStatusById(id, status);
  }
}
