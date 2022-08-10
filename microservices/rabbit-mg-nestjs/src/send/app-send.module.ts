import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppSenderService } from './app-sender.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from '../constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: MATH_SERVICE,

    //     imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => {
    //       const rabbitMqPort = configService.get('RABBIT_MQ_PORT');
    //       console.log('rabbitMqPort', rabbitMqPort);

    //       return {
    //         transport: Transport.RMQ,
    //         options: {
    //           urls: [`amqp://localhost:${rabbitMqPort}`],
    //           queue: 'cats_queue',
    //           queueOptions: { durable: false },
    //         },
    //       };
    //     },

    //     inject: [ConfigService],
    //   },
    // ]),

    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5674'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppSenderService],
})
export class AppSendModule {}
