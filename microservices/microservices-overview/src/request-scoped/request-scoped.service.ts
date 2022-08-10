import {
  // Inject,
  Injectable,
  Scope,
} from '@nestjs/common';

export interface RequestContext<T = any> {
  pattern: string | Record<string, any>;
  data: T;
}

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  // constructor(@Inject(CONTEXT) private ctx: RequestContext) {}
}
