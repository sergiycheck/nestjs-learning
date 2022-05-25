import { Module } from '@nestjs/common';
import { StreamingFilesController } from './streaming-files.controller';

@Module({
  controllers: [StreamingFilesController],
})
export class StreamingFilesModule {}
