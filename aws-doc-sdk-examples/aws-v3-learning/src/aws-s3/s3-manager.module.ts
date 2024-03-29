import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { S3ManagerController } from './s3-manager.controller';
import { MulterModule } from '@nestjs/platform-express';
import { S3ManagerService } from './s3-manager.service';
import * as Joi from 'joi';

import { S3ManagerCorsController } from './s3-manager-cors.controller';
import { S3ManagerAclController } from './s3-manager-acl.controller';
import { S3ManagerPoliciesController } from './s3-manager-policies.controller';
import { S3ManagerStaticWebsiteController } from './s3-manager-static-website.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        IMAGES_PUBLIC_BUCKET: Joi.string().required(),
        IAM_USER_KEY_ID: Joi.string().required(),
        IAM_USER_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
    //register multer to keep objects in memory
    MulterModule.register({}),
  ],
  providers: [S3ManagerService],
  controllers: [
    S3ManagerController,
    S3ManagerCorsController,
    S3ManagerAclController,
    S3ManagerPoliciesController,
    S3ManagerStaticWebsiteController,
  ],
})
export class S3ManagerModule {}
