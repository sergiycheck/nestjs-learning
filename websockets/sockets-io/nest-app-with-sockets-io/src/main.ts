import { RedisIoAdapter } from './common/adapters/redisIo.adapter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './root-module/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const redisIoAdapter = new RedisIoAdapter(configService, app);
  await redisIoAdapter.connectToRedis();

  await app.listen(+configService.get('PORT'));
  console.log(`App is listening on ${await app.getUrl()}`);
}
bootstrap();
