import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RemoteUsersWithHttpController } from './remote-users-with-http.controller';

@Module({
  imports: [HttpModule],
  controllers: [RemoteUsersWithHttpController],
})
export class RemoteUsersWithHttpModule {}
