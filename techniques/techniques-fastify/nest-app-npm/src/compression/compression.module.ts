import { Module } from '@nestjs/common';
import { CompressionController } from './compression.controller';

@Module({
  controllers: [CompressionController],
})
export class CompressionModule {}
