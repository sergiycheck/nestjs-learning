import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeOptions } from 'sequelize-typescript';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { Post } from './post/models/post.model';
// import { PostModule } from './post/post.module';
import { PostModule } from './post/post.module-inject-sequelize';

const defaultOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'serhii_pass',
  database: 'nestjs-db1',
  synchronize: true,
} as Partial<SequelizeOptions>;

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...defaultOptions,
      models: [User],
    }),
    SequelizeModule.forRoot({
      ...defaultOptions,
      name: 'postsConnection',
      models: [Post],
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
