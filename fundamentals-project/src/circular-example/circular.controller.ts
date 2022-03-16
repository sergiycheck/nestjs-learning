import { Controller, Get } from '@nestjs/common';
import { CircularService } from './circular.service';

@Controller('circular')
export class CircularController {
  constructor(private readonly circularService: CircularService) {}

  @Get('get-message')
  getMessage() {
    return this.circularService.getMessage();
  }
}
