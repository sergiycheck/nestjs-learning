import { FileInfo } from './../file-upload/dtos/file-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectQueue } from '@nestjs/bull';
import { Controller, UseInterceptors, Post, Body, UploadedFile, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';

@ApiTags('AudioManageController')
@Controller('audio')
export class AudioManageController {
  private readonly logger = new Logger(AudioManageController.name);
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @UseInterceptors(FileInterceptor('audio'))
  @Post('transcode')
  //audio.mp3
  async transcode(@Body() fileInfo: FileInfo, @UploadedFile() file: Express.Multer.File) {
    this.logger.debug('got file info', fileInfo);
    this.logger.debug('got file', file.originalname);
    const jobResult = await this.audioQueue.add('transcode', {
      file: file,
    });

    return {
      jobResult,
    };
  }
}
