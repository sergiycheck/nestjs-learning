import { Injectable, Logger, Module } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent, OrderRemovedEvent, OrderUpdatedEvent } from './dtos/order-events';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  emitSomeEvent() {
    this.eventEmitter.emit(
      'order.created',
      new OrderCreatedEvent({
        orderId: 1,
        payload: {},
      }),
    );
  }

  @OnEvent('order.created')
  handleOrderCreatedEvent(payload: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    this.logger.log('order.created event', payload);
  }

  @OnEvent('order.created', { async: true })
  handleOrderCreatedEventAsyncEvent(payload: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent" event

    this.logger.log('handleOrderCreatedEventAsyncEvent order.created event', payload);
  }

  //sample events foo.bar, ['foo', 'bar']
  //order.* will match, for example, the events order.created and order.shipped but not order.delayed.out_of_stock
  @OnEvent('order.*')
  handleOrderEvents(payload: OrderCreatedEvent | OrderRemovedEvent | OrderUpdatedEvent) {
    // handle and process an event

    this.logger.log('handleOrderEvents', payload);
  }

  //multi level wildcard
  @OnEvent('**')
  handleEverything(payload: any) {
    // handle and process an event
    this.logger.log('handleEverything', payload);
  }
}

@Module({
  providers: [EventsService],
})
export class EventsLearningModule {}
