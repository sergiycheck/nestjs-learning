import { CreateOrderDto, SendGetMsgDto } from './dto/dtos.dto';
import { Events, Messages } from './../constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { REDIS_PROXY_CLIENT } from '../constants';

@Injectable()
export class AppService {
  constructor(@Inject(REDIS_PROXY_CLIENT) private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendAndGetHelloMessage(sendGetMsgDto: SendGetMsgDto) {
    return this.client.send(
      // patterns are serialized and sent with request
      { cmd: Messages.greeting },
      { ...sendGetMsgDto },
    );
  }

  sendNumsAndGet(nums: number[]) {
    return this.client.send({ cmd: Messages.numbers }, nums);
  }

  publishOrderCreated(createOrderDto: CreateOrderDto) {
    return this.client.emit(Events.order_created, {
      ...createOrderDto,
    });
  }
}
