import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureOneModule } from './feature-one/feature-one.module';
import { FeatureTwoPartialConfRegModule } from './feature-two-partial-conf-reg/feature-two-partial-conf-reg.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .required()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().required().default(3012),
        TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        USERNAME: Joi.string().required(),
        PASSWORD: Joi.string().required(),
        DATABASE: Joi.string().required(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    FeatureOneModule,
    FeatureTwoPartialConfRegModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
