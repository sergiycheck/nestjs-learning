import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/techniques-mongo-db-1', {
      connectionName: 'cats',
    }),
    MongooseModule.forRoot('mongodb://localhost/techniques-mongo-db-1', {
      connectionName: 'users',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
