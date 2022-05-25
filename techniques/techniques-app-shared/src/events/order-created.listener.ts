import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';
import { EventNames, OrderCreatedEvent } from './dtos/order-events';

@Injectable()
export class OrderCreatedListener {
  private readonly logger = new Logger(OrderCreatedListener.name);

  @OnEvent(`${EventNames.orderName}.${EventNames.orderActions.created}`)
  handleOrderCreatedEvent(payload: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    this.logger.log('order.created event', JSON.stringify(payload));
  }
}
