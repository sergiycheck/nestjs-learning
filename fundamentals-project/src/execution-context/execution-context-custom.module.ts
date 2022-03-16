import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exeptions.filter';
import { AuthGuard } from './auth.guard';
import { CatsController } from './cats.controller';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [CatsController],
})
export class ExecutionContextCustomModule {}
