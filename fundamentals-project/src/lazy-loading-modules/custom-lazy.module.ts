import { Module } from '@nestjs/common';

//lazy loading can help decrease bootstrap time by loading only modules required by the specific serverless function
//invocation.

@Module({})
export class CustomLazyModule {}
