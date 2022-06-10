import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AWSError } from 'aws-sdk';
import { Response } from 'express';

@Catch()
export class AllExceptionsFromAwsFilter extends BaseExceptionFilter {
  catch(exception: AWSError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message;

    return response
      .status(200)
      .json({ name: exception.name, status: exception.statusCode, message });
  }
}
