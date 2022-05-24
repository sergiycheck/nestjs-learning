import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
// import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly Cats: Cat[] = [];
  create(createCatDto: CreateCatDto) {
    this.Cats.push(createCatDto);
  }

  findAll() {
    return this.Cats;
  }
}
