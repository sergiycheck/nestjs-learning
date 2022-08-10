import { Module } from '@nestjs/common';
import { DecoratorBasedController } from './decorator-based.controller';

@Module({
  controllers: [DecoratorBasedController]
})
export class DecoratorBasedModule {}
