import { REDIS_PROXY_CLIENT } from './constants';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './root-module/app.controller';
import { AppService } from './root-module/app.service';
import { RedisNotificationsService } from './redis-notifications/redis-notifications.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REDIS_PROXY_CLIENT,
        transport: Transport.REDIS,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, RedisNotificationsService],
})
export class AppModule {}
