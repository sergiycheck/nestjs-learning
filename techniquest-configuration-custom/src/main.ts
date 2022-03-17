import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
// import { AppModule } from './app.module-ignore-env-vars';
// import { AppModule } from './app.module-load-config';
// import { AppModule } from './app.module-load-config-yaml';
// import { AppModule } from './app.module-load-db-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3011);
}
bootstrap();
