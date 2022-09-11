import { AuthorPostsModule } from './author-posts/authorPosts.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.{gql,graphql}'],
      playground: false,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'subscriptions-transport-ws': true,
        'graphql-ws': true,
      },
    }),
    AuthorPostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
