import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatModule } from './cat/cat.module';
import { CatModule } from './cat/cat.module-with-hooks';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/techniques-mongo-db-1'),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
