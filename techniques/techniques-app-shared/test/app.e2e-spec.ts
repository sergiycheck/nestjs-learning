import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/root-module/app.module';
import { readFileSync } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World! shared techniques-app');
  });

  it('should allow for file uploads', async () => {
    const fileName = 'sample.txt';
    const filePath = `./scripts/upload-file/upload-one-file/${fileName}`;
    return request(app.getHttpServer())
      .post('/file/upload')
      .attach('file', filePath)
      .field('name', 'test')
      .expect(201)
      .then((response) => {
        const data = response.body;
        const expected = {
          file: readFileSync(filePath).toString(),
          body: {
            name: 'test',
          },
          fileProps: { originalName: fileName },
        };
        expect(data).toEqual(expected);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
