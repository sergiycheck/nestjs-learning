import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateOrderDto } from './dtos/order-dtos.dto';
import { EventNames, OrderCreatedEvent } from './dtos/order-events';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderEventsService {
  private readonly entities: OrderEntity[] = [
    {
      id: 1,
      name: 'order 1 name',
      description: 'order 1 description',
    },
    {
      id: 2,
      name: 'order 2 name',
      description: 'order 2 description',
    },
  ];

  constructor(private eventEmitter: EventEmitter2) {}

  create(createDto: CreateOrderDto) {
    const newOrder = {
      id: this.entities.length + 1,
      ...createDto,
    };
    this.entities.push(newOrder);

    const orderCreatedEvent = new OrderCreatedEvent(createDto);
    this.eventEmitter.emit(
      `${EventNames.orderName}.${EventNames.orderActions.created}`,
      orderCreatedEvent,
    );

    return newOrder;
  }

  findAll() {
    return this.entities;
  }
}
