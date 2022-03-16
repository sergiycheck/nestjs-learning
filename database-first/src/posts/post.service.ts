import { Injectable } from '@nestjs/common';
import { Connection, EntityManager } from 'typeorm';
import { InjectConnection, InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}
}
