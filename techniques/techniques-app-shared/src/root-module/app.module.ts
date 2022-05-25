import { OrderEventsModule } from './../events/order-events.module';
import { EventsLearningModule } from './../events/events-learning.module';
import { CookieLearningModule } from './../cookie/cookie-module.module';
import { RegisterQueueModule } from './../queue-bull/register-queue.module';
import { CronTasksSchedulingModule } from './../task-scheduling/task-scheduling.module';
import { VersioningModule } from './../versioning/verioning.module';
import { UsersModule } from './../file-upload/sequelize-trying/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileUploadAppModule } from './../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from '../file-upload/sequelize-trying/sequelize-config.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    // file-upload start
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        MULTER_DEST: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        IMAGES_PUBLIC_BUCKET: Joi.string().required(),
        IAM_USER_KEY_ID: Joi.string().required(),
        IAM_USER_SECRET_ACCESS_KEY: Joi.string().required(),
        //
        PG_DB_HOST: Joi.string().required(),
        PG_DB_PORT: Joi.number().required(),
        PG_DB_USERNAME: Joi.string().required(),
        PG_DB_PASSWORD: Joi.string().required(),
        PG_DB_DATABASE: Joi.string().required(),
      }),
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
      inject: [ConfigService],
    }),
    FileUploadAppModule,
    UsersModule,
    //file-upload end

    //versioning
    VersioningModule,

    //task-scheduling
    ScheduleModule.forRoot(),
    CronTasksSchedulingModule, //logs message to console

    //queue
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379, //redis port
      },
    }),
    RegisterQueueModule,

    //cookie
    CookieLearningModule,

    //events
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    EventsLearningModule,
    OrderEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
