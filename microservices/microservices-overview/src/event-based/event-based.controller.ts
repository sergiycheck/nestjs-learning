import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('event-based')
export class EventBasedController {
  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
  }
}
