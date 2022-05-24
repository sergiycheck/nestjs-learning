import { TechniquesCookieModule } from '../techniques/techniques-cookies/techniques-cookies.module';
import { CatsModule } from './../cats/cats.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CatsModule, TechniquesCookieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
