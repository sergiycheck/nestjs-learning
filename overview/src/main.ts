import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AllExceptionsFilter } from './filters/http-exception.filter-catch-everything';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { RolesGuard } from './guards/roles.guard';
// import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //filters part
  // app.useGlobalFilters(new HttpExceptionFilter());

  // const {
  //   httpAdapter,
  // }: { httpAdapter: HttpAdapterHost<AbstractHttpAdapter<any, any, any>> } =
  //   app.get(HttpAdapterHost);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalGuards(new RolesGuard())
  // app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(3000);
}
bootstrap();
