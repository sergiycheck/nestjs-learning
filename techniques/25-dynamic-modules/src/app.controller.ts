import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { TransientCustomService } from './injection-scopes/transient-service.service';
import { DefaultCustomService } from './injection-scopes/default-scope.service';

let singletonCounter = 0;
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly transientService: TransientCustomService,
    private readonly defaultService: DefaultCustomService,
  ) {
    singletonCounter++;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('message-from-config-service')
  getConfigServiceMsg() {
    return this.configService.get('HELLO_MESSAGE');
  }

  @Get('constructor-call')
  getSingletonCounter() {
    return `counter scope:singleton = ${singletonCounter}`;
  }

  @Get('transient-service-counter')
  getTransientServiceCounter() {
    return `
      AppController 
      transient service counter ${this.transientService.getCounter()}`;
  }

  @Get('default-service-counter')
  getDefaultServiceCounter() {
    return `
      AppScopeSingletonController 
      default service counter  = ${this.defaultService.getCounter()}`;
  }
}
