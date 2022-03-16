import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

type FinAllParams = {
  activeOnly: boolean;
  page: number; // 1 | 2 | 3 ... 100500
};
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(params?: FinAllParams): Cat[] {
    const maxPerPage = 10;
    let start = 0;
    const page = !params.page ? 1 : params.page;
    const end = maxPerPage * page;
    if (end > maxPerPage) {
      start = end - maxPerPage;
    }
    return params ? this.cats.slice(start, end) : this.cats;
  }
}
