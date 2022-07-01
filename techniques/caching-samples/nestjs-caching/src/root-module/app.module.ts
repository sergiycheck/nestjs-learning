import { TodosModule } from './../todos/todos.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { DynamicRedisCacheModule } from './cust-dynamic-redis-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        //
        MONGODB_PORT: Joi.number().required(),
        MONGODB_USERNAME: Joi.string().required(),
        MONGODB_PASSWORD: Joi.string().required(),
        MONGODB_HOST: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        MONGODB_AUTH_MECHANISM: Joi.string().required(),
        MONGODB_AUTH_SOURCE: Joi.string().required(),
        //
        CACHE_TTL: Joi.string().required(),
        //
        REDIS_CACHE_HOST: Joi.string().required(),
        REDIS_CACHE_PORT: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbPort = +configService.get<string>('MONGODB_PORT');
        const dbUsername = configService.get<string>('MONGODB_USERNAME');
        const dbPassword = configService.get<string>('MONGODB_PASSWORD');
        const dbHost = configService.get<string>('MONGODB_HOST');
        const dbName = configService.get<string>('MONGODB_NAME');
        const dbAuthMechanism = configService.get<string>('MONGODB_AUTH_MECHANISM');
        const dbAuthSource = configService.get<string>('MONGODB_AUTH_SOURCE');

        const uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authMechanism=${dbAuthMechanism}&authSource=${dbAuthSource}`;

        console.log(uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    DynamicRedisCacheModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    AllExceptionsFilter,
    AppService,
    { provide: APP_FILTER, useExisting: AllExceptionsFilter },
  ],
})
export class AppModule {}
