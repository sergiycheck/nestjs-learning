import { Test, TestingModule } from '@nestjs/testing';
import { ServerSentEventsController } from './server-sent-events.controller';

describe('ServerSentEventsController', () => {
  let controller: ServerSentEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerSentEventsController],
    }).compile();

    controller = module.get<ServerSentEventsController>(ServerSentEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
