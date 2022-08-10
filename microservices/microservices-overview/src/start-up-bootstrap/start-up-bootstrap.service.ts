import { ClientProxy } from '@nestjs/microservices';
import { MATH_SERVICE } from './../constants';
import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class StartUpBootstrapService implements OnApplicationBootstrap {
  constructor(@Inject(MATH_SERVICE) private client: ClientProxy) {}
  async onApplicationBootstrap() {
    // await this.client.connect();
  }
}
