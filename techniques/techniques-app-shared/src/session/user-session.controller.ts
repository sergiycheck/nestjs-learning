import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, Session } from '@nestjs/common';
import { Request } from 'express';

@ApiTags('UserSessionController')
@Controller('user-session')
export class UserSessionController {
  @Get('user-visits')
  findAll(@Session() session: Record<string, any>, @Req() request: Request) {
    session.visits = session.visits ? session.visits + 1 : 1;

    return {
      session,
    };
  }

  @Get('any-other-request')
  getSomeValue() {
    return 'some value';
  }
}
