import { CreateAuthorInput, UpdateAuthorInput } from './dto/dtos.dto';
import { Injectable } from '@nestjs/common';
import { Author } from './entities/entities.entity';

const authors: Author[] = [
  {
    id: 1,
    firstName: 'author1',
    lastName: 'authorLast1',
  },
  {
    id: 2,
    firstName: 'author2',
    lastName: 'authorLast2',
  },
];

@Injectable()
export class AuthorsService {
  create(createAuthorInput: CreateAuthorInput) {
    const author: Author = {
      ...createAuthorInput,
      id: authors[authors.length - 1].id + 1,
    };
    authors.push(author);
    return author;
  }

  findAll() {
    return authors;
  }

  findOne(id: number) {
    return authors.find((a) => a.id === id);
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    let author = this.findOne(id);
    if (!author) return;
    author = {
      ...author,
      ...updateAuthorInput,
    };
    return author;
  }

  remove(id: number) {
    const author = this.findOne(id);
    if (!author) return;
    return authors.filter((a) => a.id !== id);
  }
}
