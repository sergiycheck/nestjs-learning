import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class CatsServiceWithLazyModule {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}
}
