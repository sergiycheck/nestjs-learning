import { Test, TestingModule } from '@nestjs/testing';
import { FeatureTwoPartialConfRegService } from './feature-two-partial-conf-reg.service';

describe('FeatureTwoPartialConfRegService', () => {
  let service: FeatureTwoPartialConfRegService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureTwoPartialConfRegService],
    }).compile();

    service = module.get<FeatureTwoPartialConfRegService>(FeatureTwoPartialConfRegService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
