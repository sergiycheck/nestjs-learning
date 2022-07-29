import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from '../constants';
import { AppReceiveController } from './app-receive.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
    }),

    ClientsModule.registerAsync([
      {
        name: MATH_SERVICE,

        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqPort = configService.get('RABBIT_MQ_PORT');

          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://localhost:${rabbitMqPort}`],
              queue: 'cats_queue',
              queueOptions: { durable: false },
            },
          };
        },

        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppReceiveController],
})
export class AppReceiveModule {}
