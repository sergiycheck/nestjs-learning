import { Test, TestingModule } from '@nestjs/testing';
import { EventBasedController } from './event-based.controller';

describe('EventBasedController', () => {
  let controller: EventBasedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventBasedController],
    }).compile();

    controller = module.get<EventBasedController>(EventBasedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
