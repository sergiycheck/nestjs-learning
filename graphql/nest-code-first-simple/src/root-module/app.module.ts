import { TodosModule } from './../todos/todos.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

//zod required additional configuration

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        //
        MONGODB_PORT: Joi.number().required(),
        MONGODB_USERNAME: Joi.string().required(),
        MONGODB_PASSWORD: Joi.string().required(),
        MONGODB_HOST: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        MONGODB_AUTH_MECHANISM: Joi.string().required(),
        MONGODB_AUTH_SOURCE: Joi.string().required(),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbPort = +configService.get<string>('MONGODB_PORT');
        const dbUsername = configService.get<string>('MONGODB_USERNAME');
        const dbPassword = configService.get<string>('MONGODB_PASSWORD');
        const dbHost = configService.get<string>('MONGODB_HOST');
        const dbName = configService.get<string>('MONGODB_NAME');
        const dbAuthMechanism = configService.get<string>('MONGODB_AUTH_MECHANISM');
        const dbAuthSource = configService.get<string>('MONGODB_AUTH_SOURCE');

        const uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authMechanism=${dbAuthMechanism}&authSource=${dbAuthSource}`;

        console.log(uri);
        return { uri };
      },
      inject: [ConfigService],
    }),
    // default graphql playground
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   include: [TodosModule],
    //   driver: ApolloDriver,
    //   debug: true,
    //   playground: true,
    //   autoSchemaFile: zn(process.cwd(), 'src/schema.gql'),
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
  providers: [
    AppService,
    AllExceptionsFilter,
    { provide: APP_FILTER, useExisting: AllExceptionsFilter },
  ],
})
export class AppModule {}
