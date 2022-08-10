import { MathModule } from './../math/math.module';
import { Module } from '@nestjs/common';
import { ClientBasedController } from './client-based.controller';

@Module({
  imports: [MathModule],
  controllers: [ClientBasedController],
})
export class ClientBasedModule {}
