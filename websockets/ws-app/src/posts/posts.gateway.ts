import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@WebSocketGateway()
export class PostsGateway {
  constructor(private readonly postsService: PostsService) {}

  @SubscribeMessage('createPost')
  create(@MessageBody() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @SubscribeMessage('findAllPosts')
  findAll() {
    return this.postsService.findAll();
  }

  @SubscribeMessage('findOnePost')
  findOne(@MessageBody() id: number) {
    return this.postsService.findOne(id);
  }

  @SubscribeMessage('updatePost')
  update(@MessageBody() updatePostDto: UpdatePostDto) {
    return this.postsService.update(updatePostDto.id, updatePostDto);
  }

  @SubscribeMessage('removePost')
  remove(@MessageBody() id: number) {
    return this.postsService.remove(id);
  }
}
