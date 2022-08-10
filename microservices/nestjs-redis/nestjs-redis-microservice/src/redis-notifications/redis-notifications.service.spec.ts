import { Test, TestingModule } from '@nestjs/testing';
import { RedisNotificationsService } from './redis-notifications.service';

describe('RedisNotificationsService', () => {
  let service: RedisNotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisNotificationsService],
    }).compile();

    service = module.get<RedisNotificationsService>(RedisNotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
