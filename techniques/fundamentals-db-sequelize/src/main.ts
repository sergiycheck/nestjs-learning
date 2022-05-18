import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppModule } from './app.module-multiple-databases';
// import { AppModule } from './app.module-async';
// import { AppModule } from './app.module-async-provider';
import { AppModule } from './app.module-use-custom-config-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
