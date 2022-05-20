import { ApiTags } from '@nestjs/swagger';
import { FileInfo } from '../dtos/file-info.dto';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { editFileName, imageFileFilter } from '../file-upload.utils';

@ApiTags('store-locally')
@Controller('store-locally')
export class StoreLocallyController {
  constructor() {}

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
}
