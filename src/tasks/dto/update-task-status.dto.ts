import { IsEnum } from 'class-validator';

import { TASKS_STATUS } from '../task-status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TASKS_STATUS)
  status: TASKS_STATUS;
}
