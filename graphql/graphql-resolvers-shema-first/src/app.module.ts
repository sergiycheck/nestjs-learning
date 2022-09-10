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
    // code first approach
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // //or
    // the schema will be gen on fly in-memory
    // autoSchemaFile: true,
    // }),

    //
    //
    // schema first approach
    //
    //
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
        outputAs: 'class',
        emitTypenameField: true,
      },

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthorPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
