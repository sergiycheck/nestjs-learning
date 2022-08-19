import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { INestApplicationContext } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(
    private configService: ConfigService,
    private appOrHttpServer?: INestApplicationContext | any,
  ) {
    super(appOrHttpServer);
  }

  async connectToRedis(): Promise<void> {
    const redisHost = this.configService.get('REDIS_HOST');
    const redisPort = this.configService.get('REDIS_PORT');

    const url = `redis://${redisHost}:${redisPort}`;
    const pubClient = createClient({
      url,
    });

    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
