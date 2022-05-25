import { Module } from '@nestjs/common';
import { UserSessionController } from './user-session.controller';

@Module({
  controllers: [UserSessionController],
})
export class UserSessionModule {}
