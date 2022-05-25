import { BaseEntity } from '../../common/base.entity';

export const EventNames = {
  orderName: 'order',
  orderActions: {
    created: 'created',
    updated: 'updated',
    removed: 'removed',
  },
};

export class OrderCreatedEvent extends BaseEntity {
  name: string;
  description: string;
}

export class OrderRemovedEvent extends BaseEntity {}
export class OrderUpdatedEvent extends BaseEntity {}
