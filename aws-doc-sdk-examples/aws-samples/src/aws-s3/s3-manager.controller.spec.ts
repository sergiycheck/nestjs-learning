import { Test, TestingModule } from '@nestjs/testing';
import { S3ManagerController } from './s3-manager.controller';

describe('S3ManagerController', () => {
  let controller: S3ManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3ManagerController],
    }).compile();

    controller = module.get<S3ManagerController>(S3ManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
