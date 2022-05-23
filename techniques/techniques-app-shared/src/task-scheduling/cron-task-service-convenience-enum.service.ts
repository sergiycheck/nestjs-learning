import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

//Alternatively, you can supply a JavaScript Date object to the @Cron() decorator.
//Doing so causes the job to execute exactly once, at the specified date.

@Injectable()
export class TasksServiceDifferentMethods {
  private readonly logger = new Logger(TasksServiceDifferentMethods.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('Called every 30 seconds');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  //associate the interval with a name using the following construction:
  @Interval('notifications', 2500)
  handleInterval2() {
    this.logger.debug('Called every 2.5 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
