import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';

@ApiTags('CatsControllerV1')
@Controller({
  version: '1',
})
export class CatsControllerV1 {
  @Get('cats')
  findAll(): string {
    return 'This action returns all cats for version 1';
  }
}

@ApiTags('CatsControllerRouteVersions')
@Controller()
export class CatsControllerRouteVersions {
  @Version('1')
  @Get('cats')
  findAllV1(): string {
    return 'This action returns all cats for version 1';
  }

  @Version('2')
  @Get('cats')
  findAllV2(): string {
    return 'This action returns all cats for version 2';
  }
}

@ApiTags('CatsControllerMultipleVersions')
@Controller({
  version: ['1', '2'],
})
export class CatsControllerMultipleVersions {
  @Get('cats')
  findAll(): string {
    return 'This action returns all cats for version 1 or 2';
  }
}

//not working as expected
//http://localhost:3000/v1/cats
//{"statusCode":404,"message":"Cannot GET /v1/cats","error":"Not Found"}F
@ApiTags('CatsControllerVersionNeutral')
@Controller({
  version: VERSION_NEUTRAL,
})
export class CatsControllerVersionNeutral {
  @Get('cats')
  findAll(): string {
    return 'This action returns all cats regardless of version';
  }
}
