import { Module } from '@nestjs/common';
import { getConnectionToken, SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { PostService } from './post.service';
import { Sequelize } from 'sequelize-typescript';

@Module({
  providers: [
    {
      provide: PostService,
      useFactory: (postsSequelize: Sequelize) => {
        return new PostService(postsSequelize);
      },
      inject: [getConnectionToken('postsConnection')],
    },
  ],
  imports: [SequelizeModule.forFeature([Post], 'postsConnection')],
})
export class PostModule {}
