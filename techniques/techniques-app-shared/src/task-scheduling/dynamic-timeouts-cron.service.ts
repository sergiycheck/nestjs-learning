import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DynamicTimeOutsService {
  private readonly logger = new Logger(DynamicTimeOutsService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  clearScheduledTimeout() {
    const timeout = this.schedulerRegistry.getTimeout('notifications');
    clearTimeout(timeout);
  }

  addTimeout(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
    };

    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
  }

  deleteTimeout(name: string) {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.warn(`Timeout ${name} deleted!`);
  }

  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
  }
}
