import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientCustomService {
  private transientCounter = 0;

  getCounter() {
    ++this.transientCounter;
    return this.transientCounter;
  }
}
