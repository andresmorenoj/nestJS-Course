import { TASKS_STATUS } from '../task.module';

export class GetTasksFilterDto {
  status?: TASKS_STATUS;
  search?: string;
}
