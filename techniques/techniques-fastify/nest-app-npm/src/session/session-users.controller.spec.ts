import { Test, TestingModule } from '@nestjs/testing';
import { SessionUsersController } from './session-users.controller';

describe('SessionUsersController', () => {
  let controller: SessionUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionUsersController],
    }).compile();

    controller = module.get<SessionUsersController>(SessionUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
