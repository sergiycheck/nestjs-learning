import { AuthorPostsModule } from './author-posts/authorPosts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './root-module/app.controller';
import { AppService } from './root-module/app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// ts-node generate-typings
// or start the project to get graphql.ts file
@Module({
  imports: [
    // for graphql playground
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: true,
    //   typePaths: ['./**/*.{gql,graphql}'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //   },
    // }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.{gql,graphql}'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthorPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
