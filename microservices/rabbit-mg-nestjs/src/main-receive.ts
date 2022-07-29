import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppReceiveModule } from './receive/app-receive.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppReceiveModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5674'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
  console.log(`Microservice is running `);
}
bootstrap();
