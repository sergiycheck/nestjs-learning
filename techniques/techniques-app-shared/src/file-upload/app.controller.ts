import { ConfigService } from '@nestjs/config';
import { FileInfo } from './dtos/file-info.dto';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Get,
  Query,
  Res,
  Injectable,
  Req,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { editFileName, imageFileFilter, getFileKeyFromFile } from './file-upload.utils';
import { UploaderToS3Service } from './uploaderToS3.service';

@Controller('file')
export class AppController {
  constructor(private serviceUploadToS3: UploaderToS3Service) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@Body() body: FileInfo, @UploadedFile() file: Express.Multer.File) {
    return {
      file: file.buffer.toString(),
      body,
      fileProps: { originalName: file.originalname, filename: file.filename },
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-bigger')
  uploadBiggerFile(@Body() body: FileInfo, @UploadedFile() file: Express.Multer.File) {
    return {
      file: file.buffer.byteLength,
      body,
      fileProps: { originalName: file.originalname, filename: file.filename },
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-to-s3')
  async uploadFileToAmazonS3(@Body() body: FileInfo, @UploadedFile() file: Express.Multer.File) {
    console.log('data of uploading file', body);
    const result = await this.serviceUploadToS3.uploadToS3(file);
    return {
      result,
    };
  }

  @Post('multiple-images')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadMultipleImages(@Body() body: FileInfo, @UploadedFiles() files: Array<Express.Multer.File>) {
    const filesInfoArr = files.reduce((prev, curr) => {
      prev.push({
        originalName: curr.originalname,
        filename: curr.filename,
        pathOfTheUploadedImage: curr.path,
      });
      return prev;
    }, []) as Array<{ originalName: string; filename: string }>;

    return {
      info: body,
      filesInfoArr,
    };
  }

  @Get('get-image')
  getUploadedImage(@Query('img') searchText, @Res() res: Response) {
    return res.sendFile(searchText, { root: './uploads' });
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-many')
  uploadMany(@UploadedFile() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  @Post('upload-different-files')
  uploadDifferentFiles(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    console.log('files ', files);
  }
  @UseInterceptors(AnyFilesInterceptor())
  @Post('upload-any-files')
  uploadAnyFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
