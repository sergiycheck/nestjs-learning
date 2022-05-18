import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppModule } from './app.module-multiple-connections';
// import { AppModule } from './app.module-with-plugin';
// import { AppModule } from './app.module-async-config';
// import { AppModule } from './app.module-async-config-providers';
import { AppModule } from './app.module-async-use-provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//working example
//https://github.com/nestjs/nest/tree/master/sample/06-mongoose
