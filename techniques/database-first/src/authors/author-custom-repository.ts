import { EntityRepository, Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {}
