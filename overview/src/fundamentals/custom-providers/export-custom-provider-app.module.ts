import { Module } from '@nestjs/common';

class OptionsProvider {
  get = () => undefined;
}

class DatabaseConnection {
  options: any;
  constructor(options: any) {
    this.options = options;
  }
}

const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class AppModule {}
