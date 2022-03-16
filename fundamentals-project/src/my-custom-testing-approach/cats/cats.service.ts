import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats = [];

  create(cat: any) {
    this.cats.push(cat);
  }

  getAll() {
    return this.cats;
  }
}
