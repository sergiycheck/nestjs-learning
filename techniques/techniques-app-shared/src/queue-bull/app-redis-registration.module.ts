import { BullModule, BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable, Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.forRoot('alternative-config', {
      redis: {
        port: 6381,
      },
    }),

    //or
    // BullModule.forRootAsync({
    //   useFactory: () => ({
    //     redis: {
    //       host: 'localhost',
    //       port: 6379,
    //     },
    //   }),
    // }),

    // or

    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     redis: {
    //       host: configService.get('QUEUE_HOST'),
    //       port: +configService.get('QUEUE_PORT'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // })

    //or

    // BullModule.forRootAsync({
    //   useClass: BullConfigService,
    // }),
  ],
})
export class AppModuleRedisRegistration {}

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    };
  }
}
