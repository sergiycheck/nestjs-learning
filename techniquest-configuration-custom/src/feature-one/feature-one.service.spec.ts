import { Test, TestingModule } from '@nestjs/testing';
import { FeatureOneService } from './feature-one.service';

describe('FeatureOneService', () => {
  let service: FeatureOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureOneService],
    }).compile();

    service = module.get<FeatureOneService>(FeatureOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
