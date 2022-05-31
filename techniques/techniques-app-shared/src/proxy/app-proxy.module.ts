import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppProxyService } from './app-proxy.service';

@Module({
  imports: [ConfigModule],
  providers: [AppProxyService],
})
export class AppProxyModule {}
