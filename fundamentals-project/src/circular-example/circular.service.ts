import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InputService } from './input.service';

@Injectable()
export class CircularService {
  constructor(
    @Inject(forwardRef(() => InputService))
    public readonly service: InputService,
  ) {}

  public getMessage() {
    return `${this.service.getMessage()} \n and circular service message`;
  }
}
