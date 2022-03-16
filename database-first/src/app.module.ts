import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { AuthorModule } from './authors/author.module';

const defaultOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'serhii_pass',
  database: 'nestjs-db1',
  synchronize: true,
  host: 'localhost',
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...defaultOptions,
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
    }),

    UserModule,
    PostModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
