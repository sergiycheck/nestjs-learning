import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

//The @Catch(HttpException) decorator bind the required
//metadata to the exception filter, telling Nest that this particuler filter
//is looking for exceptions of type HttException
@Catch(HttpException)
// all exception filters should implement the generic ExceptionFilter<T> interface
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
//filters can be scoped at different levels:
//method-scoped, controller-scoped or global-scoped
