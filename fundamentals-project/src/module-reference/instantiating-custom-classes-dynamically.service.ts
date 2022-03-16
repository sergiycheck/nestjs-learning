import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

class CatsFactory {
  getMessage() {
    return 'message from cats factory';
  }
}

@Injectable()
export class CatsServiceDynamicallyInjectable implements OnModuleInit {
  private catsFactory: CatsFactory;

  constructor(private moduleRef: ModuleRef) {
    this.moduleRef = moduleRef;
  }

  async onModuleInit() {
    this.catsFactory = await this.moduleRef.create(CatsFactory);

    // console.log(`this.getMessage()`, this.getMessage());
  }

  getMessage() {
    return this.catsFactory.getMessage();
  }
}
