import { Test, TestingModule } from '@nestjs/testing';
import { PostsGateway } from './posts.gateway';
import { PostsService } from './posts.service';

describe('PostsGateway', () => {
  let gateway: PostsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsGateway, PostsService],
    }).compile();

    gateway = module.get<PostsGateway>(PostsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
