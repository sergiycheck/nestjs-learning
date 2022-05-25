import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
// import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private readonly Cats: Cat[] = [
    {
      name: 'cat 1',
      breed: 'breed 1',
      age: 3,
    },
  ];
  create(createCatDto: CreateCatDto) {
    this.Cats.push(createCatDto);
  }

  findAll() {
    return this.Cats;
  }
}
