import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

//Once, at a specified date/time.
//On a recurring basis; recurring jobs can run at a specified instant within
//a specified interval (for example, once per hour, once per week, once every 5 minutes)

@Injectable()
export class TasksServiceDefault {
  private readonly logger = new Logger(TasksServiceDefault.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}

//* * * * * *
// | | | | | |
// | | | | | day of week
// | | | | months
// | | | day of month
// | | hours
// | minutes
// seconds (optional)

//The @Cron() decorator supports all standard cron patterns:

// Asterisk (e.g. *)
// Ranges (e.g. 1-3,5)
// Steps (e.g. */2)
