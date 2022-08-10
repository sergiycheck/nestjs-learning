import { Module } from '@nestjs/common';
import { EventBasedController } from './event-based.controller';

@Module({
  controllers: [EventBasedController],
})
export class EventBasedModule {}
