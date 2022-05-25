import { ApiTags } from '@nestjs/swagger';
import { interval, map, Observable } from 'rxjs';
import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('ServerSentEventsController')
@Controller('server-sent-events')
export class ServerSentEventsController {
  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(
        fs
          .readFileSync(path.join(process.cwd(), '/src/server-sent-events/', 'index.html'))
          .toString(),
      );
  }

  @Sse('sse')
  sse(): Observable<any> {
    const res = interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));

    return res;
  }
}
