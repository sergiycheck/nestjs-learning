import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addArbitraryJob() {
    const job = await this.audioQueue.add({
      foo: 'bar',
    });

    return job;
  }

  //When using named jobs, you must create processors for each unique name added to a queue, or the
  //queue will complain that you are missing a processor for the given job. See here for more information on consuming named jobs.
  async addNamedJob() {
    const job = await this.audioQueue.add('transcode', {
      foo: 'bar',
    });

    return job;
  }

  async addCustomizedJob() {
    const jobDelayed = await this.audioQueue.add(
      {
        foo: 'bar',
      },
      { delay: 3000 }, // 3 seconds delayed
    );

    const jobToTheRightEndOfQueue = await this.audioQueue.add(
      {
        foo: 'bar',
      },
      { lifo: true },
    );

    const jobPrioritized = await this.audioQueue.add(
      {
        foo: 'bar',
      },
      { priority: 2 },
    );

    return { jobDelayed, jobToTheRightEndOfQueue, jobPrioritized };
  }

  pauseQueue = async () => await this.audioQueue.pause();

  resumeQueue = async () => await this.audioQueue.resume();
}
