import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const packageJson = 'package.json';

@ApiTags('StreamingFilesController')
@Controller('streaming-files')
export class StreamingFilesController {
  @Get('get-package.json-piped-stream')
  getPackageJsonStream(@Res() res: Response) {
    const file = fs.createReadStream(path.join(process.cwd(), packageJson));
    file.pipe(res);
  }

  //application/octet-stream

  @Get(`streamable-file-${packageJson}`)
  getStreamableFile(): StreamableFile {
    const file = fs.createReadStream(path.join(process.cwd(), packageJson));
    return new StreamableFile(file);
  }

  @Get('get-file-with-content-disposition-header')
  getFileWithContentDispositionHeader(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = fs.createReadStream(path.join(process.cwd(), packageJson));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }
}
