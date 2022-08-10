import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorResolver } from './authours.resolver';

@Module({
  providers: [AuthorResolver, AuthorsService],
})
export class AuthorModule {}
