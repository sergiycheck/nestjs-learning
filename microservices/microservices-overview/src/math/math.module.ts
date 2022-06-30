import { ConfigModule, ConfigService } from '@nestjs/config';
import { MATH_SERVICE } from './../constants';
import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  controllers: [MathController],
  providers: [
    {
      // registering and later injecting any custom provider
      provide: MATH_SERVICE,
      useFactory: (configService: ConfigService) => {
        // const mathSvcOptions = configService.getMathSvcOptions();
        const mathSvcOptions = configService.get('math_svc');
        return ClientProxyFactory.create(mathSvcOptions);
      },
      inject: [ConfigService],
    },
  ],
  exports: [MATH_SERVICE],
})
export class MathModule {}
