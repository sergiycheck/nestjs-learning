import { S3ManagerStaticWebsiteController } from './s3-manager-static-website.controller';
import { S3ManagerPoliciesController } from './s3-manager-policies.controller';
import { S3ManagerAclController } from './s3-manager-acl.controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { S3ManagerController } from './s3-manager.controller';
import { MulterModule } from '@nestjs/platform-express';
import { S3ManagerService } from './s3-manager.service';
import { S3ManagerCorsController } from './s3-manager-cors.controller';

@Module({
  imports: [
    ConfigModule,
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
