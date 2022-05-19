import { FileInfo } from '../dtos/file-info.dto';
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploaderToS3Service } from '../services/uploaderToS3.service';

@Controller('file')
export class UploadS3Controller {
  constructor(private serviceUploadToS3: UploaderToS3Service) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-to-s3')
  async uploadFileToAmazonS3(@Body() body: FileInfo, @UploadedFile() file: Express.Multer.File) {
    console.log('data of uploading file', body);
    const result = await this.serviceUploadToS3.putObjectToS3(file);
    return {
      result,
    };
  }
}
