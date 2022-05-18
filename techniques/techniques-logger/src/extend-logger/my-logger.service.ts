import { ConsoleLogger, Injectable } from '@nestjs/common';

Injectable();
export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: any, stack?: any, context?: any, ...rest: any[]): void {
    super.error(message, stack, context, ...rest);
  }
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: any, context?: any, ...rest: any[]): void {
    super.log(message, context, ...rest);
  }
}
