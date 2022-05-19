import { PublicFile } from './entities/publicFile.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { DifferentUploadMethodsController } from './file-upload-controllers/diff-upl-methods.controller';
import { StoreLocallyController } from './file-upload-controllers/store-file-locally.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadS3Controller } from './file-upload-controllers/upload-s3.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploaderToS3Service } from './services/uploaderToS3.service';

@Module({
  imports: [
    ConfigModule,
    //register multer to keep objects in memory
    MulterModule.register({}),

    // MulterModule.register({
    //   dest: './uploads',
    // }),

    //or

    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     dest: './uploads',
    //   }),
    // }),

    //or

    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     const dest = configService.get('MULTER_DEST');
    //     return {
    //       dest,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),

    SequelizeModule.forFeature([PublicFile]),
  ],
  controllers: [UploadS3Controller, StoreLocallyController, DifferentUploadMethodsController],
  providers: [UploaderToS3Service],
  exports: [UploaderToS3Service],
})
export class FileUploadAppModule {}
