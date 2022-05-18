import { Module } from '@nestjs/common';
import {
  AppScopeRequestController,
  AppScopeSingletonController,
  AppScopeTransientController,
} from './injection-scopes/app-scope_request.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { TransientCustomService } from './injection-scopes/transient-service.service';
import { DefaultCustomService } from './injection-scopes/default-scope.service';

@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [
    AppController,
    AppScopeRequestController,
    AppScopeTransientController,
    AppScopeSingletonController,
  ],
  providers: [AppService, TransientCustomService, DefaultCustomService],
})
export class AppModule {}
