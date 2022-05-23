import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DynamicIntervalService {
  private readonly logger = new Logger(DynamicIntervalService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  clearScheduledInterval() {
    const interval = this.schedulerRegistry.getInterval('notifications');
    clearInterval(interval);
  }

  addInterval(name: string, milliseconds: number) {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    };

    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
  }

  getIntervals() {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
  }
}
