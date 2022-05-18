import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
// import { MyLoggerModule } from './extend-logger/myLogger.module';
import { MyLoggerModule } from './injecting-custom-logger/myLogger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, expandVariables: true }),
    CatsModule,
    // , MyLoggerModule
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
