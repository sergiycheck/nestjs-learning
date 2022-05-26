import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { S3ManagerController, S3ManagerService } from './s3-manager.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule,
    //register multer to keep objects in memory
    MulterModule.register({}),
  ],
  providers: [S3ManagerService],
  controllers: [S3ManagerController],
})
export class S3ManagerModule {}
