import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsGateway } from './posts.gateway';

@Module({
  providers: [PostsGateway, PostsService],
})
export class PostsModule {}
