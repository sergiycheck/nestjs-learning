import { ConfigModule } from '@nestjs/config';
import { FileUploadAppModule } from './../file-upload/file-upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        MULTER_DEST: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        IMAGES_PUBLIC_BUCKET: Joi.string().required(),
        IAM_USER_KEY_ID: Joi.string().required(),
        IAM_USER_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
    FileUploadAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
