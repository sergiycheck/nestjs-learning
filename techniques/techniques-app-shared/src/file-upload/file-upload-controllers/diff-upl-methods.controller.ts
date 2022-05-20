import { ApiTags } from '@nestjs/swagger';
import { FileInfo } from '../dtos/file-info.dto';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiTags('diff-upload-methods')
@Controller('diff-upload-methods')
export class DifferentUploadMethodsController {
  constructor() {}

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
