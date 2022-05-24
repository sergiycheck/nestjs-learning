import { TasksServiceDifferentMethods } from './cron-task-service-convenience-enum.service';
import { NotificationServiceWithLocale } from './cron-task-service-notification.service';
import { TasksServiceDefault } from './cron-task-service.service';
import { Module } from '@nestjs/common';

@Module({
  //pass to providers array and methods marked with cron decorator will work
  providers: [
    // TasksServiceDefault,
    // NotificationServiceWithLocale,
    // TasksServiceDifferentMethods,
  ],
})
export class CronTasksSchedulingModule {}
