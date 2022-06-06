import { CsrfExceptionFilter } from './filters/catch-csrf-invalid-token';
import { APP_FILTER } from '@nestjs/core';
import { CsrfProtectionMiddleware, EnhanceResponse } from '../../common/csrf.middleware';
import { ConfigModule } from '@nestjs/config';
import { FileUploadAppModule } from './../file-upload.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GoogleAuthToLocalService } from './google-auth-to-local/google-auth-to-local.service';
import { AddUserToReqMiddleware } from './middlewares/add-user-to-req.middleware';

@Module({
  imports: [SequelizeModule.forFeature([User]), FileUploadAppModule, ConfigModule],
  providers: [
    UsersService,
    //this catches better rather than with decorator @UseFilters
    //it catches unknown errors and exceptions and @UseFilter not
    CsrfExceptionFilter,
    { provide: APP_FILTER, useExisting: CsrfExceptionFilter },
    GoogleAuthToLocalService,
  ],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CsrfProtectionMiddleware, AddUserToReqMiddleware, EnhanceResponse)
      .forRoutes({ path: 'v1/users*', method: RequestMethod.ALL });
  }
}
