import { Test, TestingModule } from '@nestjs/testing';
import { ClientBasedController } from './client-based.controller';

describe('ClientBasedController', () => {
  let controller: ClientBasedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientBasedController],
    }).compile();

    controller = module.get<ClientBasedController>(ClientBasedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
