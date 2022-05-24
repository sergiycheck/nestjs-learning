import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import * as path from 'path';
import { AudioConsumer } from './audio-consumer';
import { AudioManageController } from './audio-manage.controller';
import { AudioService } from './audio.service';

//jobs are persisted in Redis
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
      processors: [path.join(__dirname, 'processor.js')],
    }),

    // BullModule.registerQueue({
    //   name: 'audio',
    //   redis: {
    //     port: 6380,
    //   },
    // }),

    //or

    // BullModule.registerQueue({
    //   configKey: 'alternative-queue',
    //   name: 'video',
    // }),
  ],
  controllers: [AudioManageController],
  providers: [AudioService, AudioConsumer],
})
export class RegisterQueueModule {}
