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
  controllers: [S3ManagerController, S3ManagerCorsController],
})
export class S3ManagerModule {}
