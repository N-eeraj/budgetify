import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

const runScheduledTasks = process.env.SKIP_SCHEDULERS !== 'true';

@Module({
  imports: [
    ...(runScheduledTasks ? [ScheduleModule.forRoot()] : []),
  ],
})
export class InfraSchedulerModule {}
