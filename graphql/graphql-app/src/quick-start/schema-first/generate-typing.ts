import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
  watch: true,
  emitTypenameField: true,

  // To generate resolvers (queries, mutations, subscriptions)
  // as plain fields without arguments, enable the skipResolverArgs option.
  skipResolverArgs: true,
});

//ts-node generate-typings
