import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], //visible outside this module (use it in out AuthService)
})
export class UsersModule {}
