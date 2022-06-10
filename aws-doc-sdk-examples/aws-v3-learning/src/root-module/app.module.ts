import { AllExceptionsFilter } from './../common/filters/all-exceptions.filter';
import { S3ManagerModule } from './../aws-s3/s3-manager.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER } from '@nestjs/core';
import { AwsLambdaModule } from '../aws-lambda/aws-lambda.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        //aws data
        AWS_REGION: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        IMAGES_PUBLIC_BUCKET: Joi.string().required(),
        IAM_USER_KEY_ID: Joi.string().required(),
        IAM_USER_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
    S3ManagerModule,
    AwsLambdaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useExisting: AllExceptionsFilter,
    },
    AllExceptionsFilter,
  ],
})
export class AppModule {}
