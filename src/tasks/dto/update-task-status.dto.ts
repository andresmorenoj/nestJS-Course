import { IsEnum } from 'class-validator';

import { TASKS_STATUS } from '../task.module';

export class UpdateTaskStatusDto {
  @IsEnum(TASKS_STATUS)
  status: TASKS_STATUS;
}
