import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author-custom-repository';

@Injectable()
export class AuthorService {
  constructor(private authorRepository: AuthorRepository) {}
}
