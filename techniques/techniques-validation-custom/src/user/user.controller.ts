import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
  ParseIntPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParams } from './dto/find-one-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('create-arr-users')
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUserDtos: CreateUserDto[],
  ) {
    return `this actions add new users ${JSON.stringify(createUserDtos)}`;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('find-by-ids')
  findUsersByIds(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return `this action returns users by this ids \n ${JSON.stringify(ids)}`;
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    //transform pipe not works for non-primitive types
    console.log('finding user by id', params.id, typeof params.id === 'number');
    return this.userService.findOne(params.id);
  }

  @Get('/with-query/:id')
  findOneWithQuery(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
    console.log(`typeof id === 'number' `, typeof id === 'number');
    console.log(`typeof sort === 'boolean' `, typeof sort === 'boolean');
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    //works for primitive args
    return this.userService.remove(+id);
  }
}
