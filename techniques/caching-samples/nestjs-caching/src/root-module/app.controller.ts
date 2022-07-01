import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import Cache from 'cache-manager';

@ApiTags('AppController')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
