import { Module } from '@nestjs/common';
import { ExampleForCookieController } from './example.controller';

@Module({
  imports: [],
  controllers: [ExampleForCookieController],
})
export class CookieLearningModule {}
