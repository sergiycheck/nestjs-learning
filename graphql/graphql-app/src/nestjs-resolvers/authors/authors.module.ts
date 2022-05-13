import { PostsModule } from './../posts/posts.module';
import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';

@Module({
  imports: [PostsModule],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
