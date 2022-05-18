import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  constructor(private configService: ConfigService) {
    super();
  }
  customLog(...args) {
    this.log('some custom message', ...args);
  }

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: any, context?: any, ...rest: any[]): void {
    if (this.configService.get('NODE_ENV') === 'dev') {
      super.log(message, context, ...rest);
    }
  }
}
