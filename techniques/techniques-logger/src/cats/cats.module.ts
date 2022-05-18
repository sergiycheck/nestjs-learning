import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MyLoggerModule } from 'src/injecting-custom-logger/myLogger.module';

@Module({
  imports: [MyLoggerModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
