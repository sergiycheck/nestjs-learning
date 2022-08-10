import { Test, TestingModule } from '@nestjs/testing';
import { AwsCloudWatchService } from './aws-cloud-watch.service';

describe('AwsCloudWatchService', () => {
  let service: AwsCloudWatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwsCloudWatchService],
    }).compile();

    service = module.get<AwsCloudWatchService>(AwsCloudWatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
