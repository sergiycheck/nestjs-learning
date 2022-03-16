import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

//method-scoped and controller scoped filters
// that extend the BaseExceptionFilter
// should not be instantiated with new
// Instead, let the framework instantiate them automatically
