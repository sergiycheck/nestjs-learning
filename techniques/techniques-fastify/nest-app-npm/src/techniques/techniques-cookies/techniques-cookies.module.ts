import { Module } from '@nestjs/common';
import { CookiesLearningController } from './cookie.controller';

@Module({
  controllers: [CookiesLearningController],
})
export class TechniquesCookieModule {}
