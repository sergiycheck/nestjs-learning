import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class DefaultCustomService {
  private defaultCounter = 0;

  getCounter() {
    ++this.defaultCounter;
    return this.defaultCounter;
  }
}
