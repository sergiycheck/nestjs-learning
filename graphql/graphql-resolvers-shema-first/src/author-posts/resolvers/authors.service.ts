import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  findOneById(id: number) {
    return `author with id ${id}`;
  }
}
