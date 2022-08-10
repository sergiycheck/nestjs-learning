import { Module } from '@nestjs/common';
import { AppController } from './root-module/app.controller';
import { AppService } from './root-module/app.service';
import { MathModule } from './math/math.module';
import { EventBasedModule } from './event-based/event-based.module';
import { DecoratorBasedModule } from './decorator-based/decorator-based.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientBasedModule } from './client-based/client-based.module';
import { MATH_SERVICE } from './constants';
import { ConfigModule } from '@nestjs/config';
import { StartUpBootstrapService } from './start-up-bootstrap/start-up-bootstrap.service';
import { RequestScopedService } from './request-scoped/request-scoped.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
    }),
    MathModule,
    EventBasedModule,
    DecoratorBasedModule,
    ClientBasedModule,
    ClientsModule.register([{ name: MATH_SERVICE, transport: Transport.TCP }]),
  ],
  controllers: [AppController],
  providers: [AppService, StartUpBootstrapService, RequestScopedService],
})
export class AppModule {}
