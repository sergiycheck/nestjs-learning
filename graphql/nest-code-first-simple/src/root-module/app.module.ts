import { TodosModule } from './../todos/todos.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import Joi from 'joi';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
      }),
    }),
    // default graphql playground
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   include: [TodosModule],
    //   driver: ApolloDriver,
    //   debug: true,
    //   playground: true,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),
    //
    // or
    //
    // apollo playground
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [TodosModule],
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
