import {
  Processor,
  Process,
  JOB_REF,
  OnQueueActive,
  OnGlobalQueueCompleted,
  InjectQueue,
} from '@nestjs/bull';
import { Inject, Logger, Scope } from '@nestjs/common';
import { Job, Queue } from 'bull';

async function doSomething(data: unknown) {
  return new Promise((resolve) => resolve(data));
}

//Consumers must be registered as providers so the @nestjs/bull package can pick them up.

@Processor('audio')
export class AudioConsumer {
  private readonly logger = new Logger(AudioConsumer.name);
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  //designate that a job handler method will handle only jobs of a certain type (jobs with a specific name)
  @Process('transcode')
  async transcode(job: Job<Express.Multer.File>) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(`job.data.buffer.length`, job.data.buffer.length);

    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await doSomething(job.data);
      progress += 1;
      await job.progress(progress);
    }

    this.logger.debug('Transcoding completed');
    return {
      message: `transcoding file with size ${job.data.size.valueOf()} successfully completed`,
    };
  }

  //This concept recognizes that events may be triggered either entirely within a
  // single process, or on shared queues from different processes.

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    const job = await this.audioQueue.getJob(jobId);
    console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
  }
}

@Processor({
  name: 'audio',
  scope: Scope.REQUEST,
})
export class AudioConsumerRequestScoped {
  constructor(@Inject(JOB_REF) jobRef: Job) {
    console.log(`jobRef `, jobRef);
  }
}

// Local event listeners	Global event listeners	Handler method signature / When fired
// @OnQueueError()	@OnGlobalQueueError()	handler(error: Error) - An error occurred. error contains the triggering error.
// @OnQueueWaiting()	@OnGlobalQueueWaiting()	handler(jobId: number | string) - A Job is waiting to be processed as soon as a worker is idling. jobId contains the id for the job that has entered this state.
// @OnQueueActive()	@OnGlobalQueueActive()	handler(job: Job) - Job jobhas started.
// @OnQueueStalled()	@OnGlobalQueueStalled()	handler(job: Job) - Job job has been marked as stalled. This is useful for debugging job workers that crash or pause the event loop.
// @OnQueueProgress()	@OnGlobalQueueProgress()	handler(job: Job, progress: number) - Job job's progress was updated to value progress.
// @OnQueueCompleted()	@OnGlobalQueueCompleted()	handler(job: Job, result: any) Job job successfully completed with a result result.
// @OnQueueFailed()	@OnGlobalQueueFailed()	handler(job: Job, err: Error) Job job failed with reason err.
// @OnQueuePaused()	@OnGlobalQueuePaused()	handler() The queue has been paused.
// @OnQueueResumed()	@OnGlobalQueueResumed()	handler(job: Job) The queue has been resumed.
// @OnQueueCleaned()	@OnGlobalQueueCleaned()	handler(jobs: Job[], type: string) Old jobs have been cleaned from the queue. jobs is an array of cleaned jobs, and type is the type of jobs cleaned.
// @OnQueueDrained()	@OnGlobalQueueDrained()	handler() Emitted whenever the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed).
// @OnQueueRemoved()	@OnGlobalQueueRemoved()	handler(job: Job) Job job was successfully removed.
