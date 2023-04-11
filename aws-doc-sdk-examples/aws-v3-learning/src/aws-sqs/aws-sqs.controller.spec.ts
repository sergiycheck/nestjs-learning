import { Test, TestingModule } from '@nestjs/testing';
import { AwsSqsController } from './aws-sqs.controller';
import { AwsSqsService } from './aws-sqs.service';

describe('AwsSqsController', () => {
  let controller: AwsSqsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsSqsController],
      providers: [AwsSqsService],
    }).compile();

    controller = module.get<AwsSqsController>(AwsSqsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
