import { Test, TestingModule } from '@nestjs/testing';
import { DecoratorBasedController } from './decorator-based.controller';

describe('DecoratorBasedController', () => {
  let controller: DecoratorBasedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecoratorBasedController],
    }).compile();

    controller = module.get<DecoratorBasedController>(DecoratorBasedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
