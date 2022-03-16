import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { CustomEventModule } from './cutom-event/custom-event.module';
import { MongooseConfigService } from './mongoose-custom-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    CatModule,
    CustomEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
