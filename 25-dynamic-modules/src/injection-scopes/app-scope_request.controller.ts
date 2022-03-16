import { Controller, Get, Scope } from '@nestjs/common';
import { TransientCustomService } from './transient-service.service';
import { DefaultCustomService } from './default-scope.service';

let requestCounter = 0;

@Controller({ path: 'scope-request', scope: Scope.REQUEST })
export class AppScopeRequestController {
  constructor() {
    requestCounter++;
  }

  @Get('constructor-call')
  getSingletonCounter() {
    return `counter scope:request = ${requestCounter}`;
  }
}

let transientCounter = 0;

@Controller({ path: 'scope-transient', scope: Scope.TRANSIENT })
export class AppScopeTransientController {
  constructor() {
    ++transientCounter;
  }

  @Get('constructor-call')
  getSingletonCounter() {
    return `counter scope:transient = ${transientCounter}`;
  }
}

@Controller({ path: 'scope-default', scope: Scope.DEFAULT })
export class AppScopeSingletonController {
  constructor(
    private readonly transientService: TransientCustomService,
    private readonly defaultService: DefaultCustomService,
  ) {}

  @Get('transient-service-counter')
  getServiceCounter() {
    return `
      AppScopeSingletonController 
      transient service counter  = ${this.transientService.getCounter()}`;
  }

  @Get('default-service-counter')
  getDefaultServiceCounter() {
    return `
      AppScopeSingletonController 
      default service counter  = ${this.defaultService.getCounter()}`;
  }
}
