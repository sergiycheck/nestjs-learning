import {
  Get,
  Res,
  Controller,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  HttpStatus,
  Put,
  Delete,
  HttpException,
  ParseIntPipe,
  UsePipes,
  DefaultValuePipe,
  ParseBoolPipe,
  UseGuards,
  UseInterceptors,
  // UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
// import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { JoiValidationPipe } from 'src/pipes/validation.pipe';
// import { HttpExceptionFilter } from './../filters/http-exception.filter';
import * as CreateCatJoiData from './dto/crate-cat.i.dto';
// import { ClassValidationPipe } from './../pipes/class-validation.pipe';
import { CustomParseIntPipe } from 'src/pipes/cutom-parse-int.pipe';
import { RolesGuard } from './../guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
// import { LoggingInterceptor } from './../interceptors/logging.interceptor';
import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { TimeoutInterceptor } from './../interceptors/timeout.interceptor';
import { CatPropDecorator } from 'src/decorators/cat.decorator';

// @UseFilters(new HttpExceptionFilter()) //global filters used
@Controller('cats')
//responsibility for instantiation to the framework and enabling dependency injection
@UseGuards(RolesGuard)
//attaches to every handler declared by this controller
// @UseGuards(new RolesGuard())
//dependency injection of interceptor
// @UseInterceptors(LoggingInterceptor) //or
//attaches interceptor to every handler declared by this controller
// @UseInterceptors(new LoggingInterceptor())
//if we want to restrict the inteceptor's scope to a single method
//we simply apply the decorator at the method level
@UseInterceptors(TransformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('all')
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): Promise<any> {
    const cats = this.catsService.findAll({ activeOnly, page });
    return {
      allCats: cats,
    };
  }

  @Post()
  create(
    // @Body(new ClassValidationPipe()) createCatDto: CreateCatDto
    //no difference with using ClassValidationPipe
    @Body() createCatDto: CreateCatDto,
    @CatPropDecorator('name') catName,
  ) {
    console.log('createCatDto', createCatDto, '\n cat name:', catName);
    this.catsService.create(createCatDto);
  }

  @Post('validate-cat-joi')
  @Roles('admin')
  @UsePipes(new JoiValidationPipe(CreateCatJoiData.CreateCatSchema))
  createWithJoi(@Body() createCatDto: CreateCatJoiData.CreateCatDto) {
    console.log('createCatDto joi', createCatDto);
    this.catsService.create(createCatDto);
  }

  // @UseFilters(new HttpExceptionFilter()) //global filters used
  @Get('give-me-error')
  getError(@Query() query) {
    if (query.type === 'forbidden')
      throw new ForbiddenException('This is my error message');

    throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
  }

  @Get('give-me-error-timeout')
  @UseInterceptors(new TimeoutInterceptor())
  getErrorWithTimeout(@Query() query) {
    const { timeout } = query;

    if (timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve(
            new ForbiddenException(
              `This is my error message with time: ${timeout}`,
            ),
          );
        }, timeout);
      });
    }

    throw new HttpException('Unknown', HttpStatus.NOT_FOUND);
  }

  //code below is for demonstrating purposes
  @Post('create-library-specific')
  createLibrarySpecific(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get('get-library-specific')
  findAllLibrarySpecific(@Res({ passthrough: true }) res: Response) {
    res
      .status(HttpStatus.OK)
      .json({ message: 'library specific response', data: [] });
  }

  @Get('ab*cd')
  findSmth() {
    return 'this route uses a wildcard';
  }

  @Post('create-thing-with-http-code')
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  createThing() {
    return 'this action add a thing';
  }

  @Get('docs')
  @Redirect('https://nestjs.com', 301)
  redirectHandler(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://nestjs.com/v5/' };
    }
  }
  //code above is for demonstrating purposes

  @Get(':id')
  //async findOne( @Param('uuid', new ParseUUIDPipe()) uuid: string )
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `this action returns a #${id} cat. \n ${new Date().toISOString()}`;
  }

  @Get()
  findOneByQuery(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `This action is using query that returns a #${id} cat. \n ${new Date().toISOString()}`;
  }

  @Get('custom-pipe/:id')
  findOneWithPipe(
    @Param('id', new CustomParseIntPipe())
    id: number,
  ) {
    return `this action returns a #${id} cat with custom pipe validation. \n ${new Date().toISOString()}`;
  }

  @Put(':id')
  updateOne(@Body() updateDto: any, @Param() params) {
    return `this method updates ${updateDto} with id ${params.id}`;
  }

  @Delete(':id')
  deleteOne(@Param() params) {
    return `this method deletes cat with id ${params.id}`;
  }
}
