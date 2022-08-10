import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { MATH_SERVICE } from '../constants';

class UserCreatedEvent {}

@Controller('client-based')
export class ClientBasedController {
  constructor(@Inject(MATH_SERVICE) private client: ClientProxy) {}
  async publish() {
    this.client.emit<number>('user_created', new UserCreatedEvent());
  }

  sendSomeMessageWithTimeout<TResult, TInput>(pattern: TResult, data: TInput) {
    // After 5 seconds, if the microservice isn't responding, it will throw an error.
    this.client.send<TResult, TInput>(pattern, data).pipe(timeout(5000));
  }
}
