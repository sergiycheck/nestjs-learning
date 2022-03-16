import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CustomEventModule } from './cutom-event/custom-event.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.register({ folder: './config' })],
      useFactory: async (configService: ConfigService) => {
        //TODO: not working error
        //Unable to connect to the database. Retrying (7)
        const uri = configService.get('MONGODB_URI');
        return uri;
      },
      inject: [ConfigService],
    }),

    CatModule,
    CustomEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
