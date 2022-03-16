import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('custom-testing-approach-cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {
    this.catsService = catsService;
  }

  @Get('all')
  getAll() {
    return { data: this.catsService.getAll() };
  }

  @Post()
  create(@Body() cat: any) {
    this.catsService.create(cat);
  }
}
