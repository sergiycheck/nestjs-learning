import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { MATH_SERVICE } from '../constants';

const patterns = {
  notifications: 'notifications',
  replaceEmoji: 'replace-emoji',
};

@Controller()
export class AppReceiveController {
  constructor(@Inject(MATH_SERVICE) private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ cmd: patterns.notifications })
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    console.log(context.getMessage());
    console.log(context.getChannelRef());
  }

  @MessagePattern({ cmd: patterns.replaceEmoji })
  replaceEmoji(@Payload() data: string, @Ctx() context: RmqContext): string {
    const message = context.getMessage();
    const { content } = message;
    console.log('content ', content.toString());

    const {
      properties: { headers },
    } = message;
    return headers['x-version'] === '1.0.0' ? '🐱' : '🐈';
  }
}
