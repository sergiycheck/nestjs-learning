import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Cookies } from 'src/common/decorators/cookies.decorator';

@ApiTags('CookiesLearningController')
@Controller('cookies-learning')
export class CookiesLearningController {
  private readonly logger = new Logger(CookiesLearningController.name);

  @Get('get-cookies')
  findAll(@Req() request: FastifyRequest) {
    this.logger.log(`request.headers`, request.headers); // or "request.cookies['cookieKey']"
    return {
      cookies: request.headers.cookie,
    };
  }

  @Get('set-cookies-to-response')
  setCookieToResponse(@Res({ passthrough: true }) response: FastifyReply) {
    response.setCookie('key', 'value');
  }

  @Get('provide-and-get-cookie-value')
  provideAndGetCookieValue(@Cookies('name') name: string) {
    return { name };
  }
}
