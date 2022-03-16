import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';

@Injectable()
export class OtherService {}

@Injectable()
export class CatsService implements OnModuleInit {
  private service: OtherService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    //if the provider has been injected in a different module
    //this.moduleRef.get(Service, {strict: false})
    this.service = this.moduleRef.get(OtherService);
  }
}

@Injectable({ scope: Scope.TRANSIENT })
export class OtherService1 {}

@Injectable()
export class CatsService1 implements OnModuleInit {
  private transientService: OtherService1;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.transientService = await this.moduleRef.resolve(OtherService);
  }
}

@Injectable()
export class CatsService2 implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const transientServices = await Promise.all([
      this.moduleRef.resolve(OtherService1),
      this.moduleRef.resolve(OtherService1),
    ]);

    console.log(
      `transientServices[0] === transientServices[1] `,
      transientServices[0] === transientServices[1],
    );
  }
}

@Injectable()
export class CatsServiceUniqueContextId implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const contextId = ContextIdFactory.create();

    const myRequestObj = {
      myKey: 'some value',
    };
    this.moduleRef.registerRequestByContextId(myRequestObj, contextId);

    const transientServices = await Promise.all([
      this.moduleRef.resolve(OtherService1, contextId),
      this.moduleRef.resolve(OtherService1, contextId),
    ]);

    console.log(
      `transientServices[0] === transientServices[1] with contextId ${JSON.stringify(
        contextId,
      )}`,
      transientServices[0] === transientServices[1],
    );

    console.log(`transientServices[0] `, transientServices[0]);
    console.log(`transientServices[1] `, transientServices[1]);
  }
}

@Injectable()
export class CatsRepository {}

@Injectable()
export class CatsServiceInjectableRequest implements OnModuleInit {
  private catsRepository: CatsRepository;

  constructor(
    @Inject(REQUEST) private request: Record<string, unknown>,
    private moduleRef: ModuleRef,
  ) {
    this.request = request;
    this.moduleRef = moduleRef;
  }

  async onModuleInit() {
    const contextId = ContextIdFactory.getByRequest(this.request);
    const catsRepository = await this.moduleRef.resolve(
      CatsRepository,
      contextId,
    );
    console.log('CatsServiceInjectableRequest catsRepository', catsRepository);
    this.catsRepository = catsRepository;
  }
}
