import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppModule } from './app-customized-caching.module';
import { AppModule } from './asyn-conf-cache.module';

//https://www.npmjs.com/package/cache-manager

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
