import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Controller, Get, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('CompressionController')
@Controller('compression')
export class CompressionController {
  @Get()
  getPackageJsonCompressed(@Res() reply: FastifyReply) {
    const filePath = path.join(__dirname, '../../package.json');
    reply.type('text/plain').compress(fs.createReadStream(filePath));
  }
}
