import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MyCustomTestingApproachModule as CatsModule } from './my-custom-testing-approach.module';
import { CatsService } from './cats/cats.service';

describe('Cats e2e', () => {
  let app: INestApplication;
  const catsService = { getAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CatsModule],
    })
      .overrideProvider(CatsService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET cats', () => {
    return request(app.getHttpServer())
      .get('/custom-testing-approach-cats/all')
      .expect(200)
      .expect({ data: catsService.getAll() });
  });

  afterAll(async () => {
    await app.close();
  });
});
