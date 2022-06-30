import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './root-module/app.controller';
import { AppService } from './root-module/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
