import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {}

  error(message: any, ...optionalParams: any[]) {}

  warn(message: any, ...optionalParams: any[]) {}

  debug(message: any, ...optionalParams: any[]) {}
  verbose(message: any, ...optionalParams: any[]) {}
}
