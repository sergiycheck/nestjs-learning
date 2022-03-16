import {
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@UseGuards(RolesGuard)
@Controller('execution-context-cats')
@Roles('user')
export class CatsController {
  @Post()
  @SetMetadata('roles', ['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    return `creating cat dto ${JSON.stringify(createCatDto)}`;
  }

  @Post('create-cat-with-decorator')
  @Roles('admin')
  createWithDecorator(@Body() createCatDto: CreateCatDto) {
    return `creating cat dto with decorator ${JSON.stringify(createCatDto)}`;
  }

  @Get()
  getCats() {
    return 'all cats';
  }
}
