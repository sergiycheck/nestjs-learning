import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class DynamicCronService {
  private readonly logger = new Logger(DynamicCronService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('* * 8 * * *', {
    name: 'notifications',
  })
  triggerNotifications() {
    const job = this.schedulerRegistry.getCronJob('notifications');

    job.stop();
    console.log(job.lastDate());
  }

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`);
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
}
