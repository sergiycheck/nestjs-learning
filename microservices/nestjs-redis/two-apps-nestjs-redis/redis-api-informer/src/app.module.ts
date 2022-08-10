import { REDIS_PROXY_CLIENT } from './constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './root-module/app.controller';
import { AppService } from './root-module/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: REDIS_PROXY_CLIENT,
      useFactory: (configService: ConfigService) => {
        const url = configService.get('REDIS_URL');
        const client = ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url,
          },
        });

        return client;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
