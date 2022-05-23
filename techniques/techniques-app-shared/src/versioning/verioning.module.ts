import {
  // CatsControllerV1,
  // CatsControllerRouteVersions,
  CatsControllerMultipleVersions,
  CatsControllerVersionNeutral,
} from './controllers/cats-v1.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    // CatsControllerV1,
    // CatsControllerRouteVersions
    // CatsControllerMultipleVersions,
    CatsControllerVersionNeutral,
  ],
})
export class VersioningModule {}
