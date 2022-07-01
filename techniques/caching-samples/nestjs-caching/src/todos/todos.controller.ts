import { HttpCacheInterceptor } from './../interceptors/http-cache.interceptor';
import { CustomParseObjectIdPipe } from './../pipes/custom-parse-objectid.pipe';
import { NotEmptyPipe } from './../pipes/not-empty.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  CacheTTL,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags } from '@nestjs/swagger';

@UseInterceptors(HttpCacheInterceptor)
@ApiTags('TodosController')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @CacheTTL(60)
  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe()) id: string,
  ) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe()) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', new NotEmptyPipe('id'), new CustomParseObjectIdPipe()) id: string) {
    return this.todosService.remove(id);
  }
}
