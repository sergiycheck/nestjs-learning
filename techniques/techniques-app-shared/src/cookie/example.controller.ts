import { Controller, Logger, Get, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import * as cookie from 'cookie';

@ApiTags('ExampleForCookieController')
@Controller('example-for-cookie')
export class ExampleForCookieController {
  private readonly logger = new Logger(ExampleForCookieController.name);

  @Get()
  makeRequest(@Req() request: Request, @Res() response: Response) {
    const { cookies, signedCookies } = request;
    this.logger.log(request.cookies); // or "request.cookies['cookieKey']"
    this.logger.log(request.signedCookies);

    response.setHeader(
      'Set-Cookie',
      cookie.serialize('name', String('CustomQuery'), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      }),
    );

    response.json({
      cookies,
      signedCookies,
    });
  }

  @Get('attach-cookie-to-an-outgoing-response')
  findAll(@Res({ passthrough: true }) response: Response) {
    response.cookie('key', 'value');
    response.end();
  }
}
