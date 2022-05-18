import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
// import { CatModule } from './cat/cat.module-with-hooks';
// import { CatModule } from './cat/cat.module-plugins';
import { CustomEventModule } from './cutom-event/custom-event.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/techniques-mongo-db-1'),
    CatModule,
    CustomEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
