import { Test, TestingModule } from '@nestjs/testing';
import { AwsCloudWatchController } from './aws-cloud-watch.controller';

describe('AwsCloudWatchController', () => {
  let controller: AwsCloudWatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsCloudWatchController],
    }).compile();

    controller = module.get<AwsCloudWatchController>(AwsCloudWatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
