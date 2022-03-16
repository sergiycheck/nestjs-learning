import { Module } from '@nestjs/common';
import { CircularController } from './circular.controller';
import { CircularService } from './circular.service';
import { InputService } from './input.service';

@Module({
  controllers: [CircularController],
  providers: [CircularService, InputService],
  exports: [CircularService],
})
export class CircularExampleModule {}
