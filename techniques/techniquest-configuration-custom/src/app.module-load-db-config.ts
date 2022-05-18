import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureOneModule } from './feature-one/feature-one.module';
import databaseConfig from 'config/database.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] }), FeatureOneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
