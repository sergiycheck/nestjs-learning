import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // include: [SomeModule],
      driver: ApolloDriver,
      debug: true,
      playground: false,
      typePaths: ['./**/.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class', //interface
      },
    }),
  ],
})
export class AppCodeFirst {}
