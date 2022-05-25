import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Session as FastifySession } from '@fastify/secure-session';

export class SessionData {
  data: string;
}

@ApiTags('SessionUsersController')
@Controller('session-users')
export class SessionUsersController {
  @Get('get-visits')
  getVisitsFromRequest(@Req() request: FastifyRequest) {
    const visits = request.session.get('visits');
    request.session.set('visits', visits ? visits + 1 : 1);

    return {
      visits: request.session.get('visits'),
    };
  }

  @Get('get-visits-from-decorator')
  getVisitsFromSessionDecorator(@Session() session: FastifySession) {
    const visits = session.get('visits');
    session.set('visits', visits ? visits + 1 : 1);

    return {
      visits: session.get('visits'),
    };
  }

  @Post('set-session-data')
  setSessionData(
    @Body() someInfo: SessionData,
    @Session() session: FastifySession,
  ) {
    session.set('data', someInfo);

    return {
      message: 'data was set',
    };
  }

  @Get('get-session-data')
  getSessionData(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    const data = request.session.get('data');
    if (!data) {
      reply.code(404).send();
      return;
    }
    reply.send(data);
  }

  @Post('remove-session-data')
  removeSessionData(
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    request.session.delete();
    reply.send('logged out');
  }
}
