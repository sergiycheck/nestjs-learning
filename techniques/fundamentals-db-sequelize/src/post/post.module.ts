import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { PostService } from './post.service';

@Module({
  imports: [SequelizeModule.forFeature([Post], 'postsConnection')],
  providers: [PostService],
})
export class PostModule {}
