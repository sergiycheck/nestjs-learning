import { Module } from '@nestjs/common';
import { AppController } from './app-files/app.controller';
import { AppService } from './app-files/app.service';
import { AppCodeFirst } from './nestjs-resolvers/app-code-first.module';

@Module({
  imports: [AppCodeFirst],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
