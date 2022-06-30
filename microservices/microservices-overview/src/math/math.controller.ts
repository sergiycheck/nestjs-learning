import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';

@Controller('math')
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  //the message handler will respond 3 times (with each item from the array)
  @MessagePattern({ cmd: 'sum-observable' })
  accumulateObervable(data: number[]): Observable<number> {
    return from([1, 2, 3]);
  }
}
