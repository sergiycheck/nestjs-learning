import { Module } from '@nestjs/common';
import { SessionUsersController } from './session-users.controller';

@Module({
  controllers: [SessionUsersController],
})
export class SessionUsersModule {}
