import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
      /**
       * providers: [
       *  {
       *    provide: APP_GUARD,
       *    useExisting: JwtAuthGuard,
       *    //^^^^^^^^^^^^^^^^^ notice the use of 'useExisting' instead of 'useClass'
       *  }
       * ]
       */
    }).compile();

    catsController = moduleRef.get<CatsController>(CatsController);
    catsService = moduleRef.get<CatsService>(CatsService);
    //for request or transient scoped services
    //catsService = await moduleRef.resolve(CatsService);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  it('should return an array of cats', async () => {
    const result = { data: ['test'] };
    jest.spyOn(catsService, 'getAll').mockImplementation(() => result.data);

    expect(catsController.getAll()).toStrictEqual(result);
  });
});
