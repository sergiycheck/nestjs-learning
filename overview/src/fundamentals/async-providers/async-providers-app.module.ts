import { Module } from '@nestjs/common';

class OptionsProvider {
  get = () => undefined;
}

function createDbConnection(options: any) {
  return new Promise((resolve) => {
    resolve(options);
  });
}

const connectionFactory = {
  provide: 'ASYNC_CONNECTION',
  useFactory: async (options) => {
    const connection = await createDbConnection(options);
    return connection;
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class AppModule {}
