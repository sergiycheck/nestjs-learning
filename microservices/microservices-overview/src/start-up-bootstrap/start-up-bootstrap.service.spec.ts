import { Test, TestingModule } from '@nestjs/testing';
import { StartUpBootstrapService } from './start-up-bootstrap.service';

describe('StartUpBootstrapService', () => {
  let service: StartUpBootstrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartUpBootstrapService],
    }).compile();

    service = module.get<StartUpBootstrapService>(StartUpBootstrapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
