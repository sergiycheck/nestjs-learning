import { OrderEventsService } from './order.service';
import { Module } from '@nestjs/common';
import { OrderCreatedListener } from './order-created.listener';
import { OrderEventsController } from './order.controller';

@Module({
  controllers: [OrderEventsController],
  providers: [OrderCreatedListener, OrderEventsService],
})
export class OrderEventsModule {}
