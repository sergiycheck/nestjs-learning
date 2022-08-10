import { Messages, Events } from './../constants';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto, SendGetMsgDto } from './dto/dtos.dto';
import { from, Observable } from 'rxjs';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // patterns are serialized and sent with request
  @MessagePattern({ cmd: Messages.greeting })
  getGreetingMessage(message: SendGetMsgDto) {
    return `Hello from redis microservice ${message.msg}`;
  }

  @MessagePattern({ cmd: 'numbers' })
  accumulate(data: number[]): Observable<number> {
    this.logger.log(`\n got nums ${data}`);
    return from([1, 2, 3, ...data]);
  }

  @EventPattern(Events.order_created)
  createOrder(order: CreateOrderDto) {
    this.logger.log(
      `\n creating order ${order.bookName} from user ${
        order.userId
      },\n ${JSON.stringify(order)}`,
    );
  }
}
