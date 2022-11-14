import { Test, TestingModule } from '@nestjs/testing';
import { AwsSnsController } from './aws-sns.controller';
import { AwsSnsService } from './aws-sns.service';

describe('AwsSnsController', () => {
  let controller: AwsSnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwsSnsController],
      providers: [AwsSnsService],
    }).compile();

    controller = module.get<AwsSnsController>(AwsSnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
