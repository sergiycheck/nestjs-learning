import {
  Injectable,
  // , Logger
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { MyLogger } from 'src/injecting-custom-logger/my-logger.service';

@Injectable()
export class CatsService {
  // private readonly logger = new Logger(CatsService.name);

  constructor(private myLogger: MyLogger) {
    // due to transient scope, CatsService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
    this.myLogger.setContext('CatsService');
  }

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    //if we call app.useLogger(app.get(MyLogger)),
    //the following call to this.logger.log()
    //from CatsService would result in call to method log from myLogger instance

    // this.logger.log(' logger message before getting all cats');

    this.myLogger.warn('about to return cats');
    this.myLogger.customLog('other message from ', this.findAll.name);

    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
