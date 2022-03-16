import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppModule } from './app.module-multiple-connections';
import { AppModule } from './app.module-with-plugin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
