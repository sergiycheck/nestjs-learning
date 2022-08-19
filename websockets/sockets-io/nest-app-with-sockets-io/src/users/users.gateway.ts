import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Socket } from 'dgram';

@WebSocketGateway({ transports: ['websocket'], namespace: 'user-events' })
export class UsersGateway {
  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('createUser')
  create(
    @MessageBody() createUserDto: CreateUserDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.usersService.create(createUserDto);
  }

  @SubscribeMessage('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: number) {
    return this.usersService.findOne(id);
  }

  @SubscribeMessage('updateUser')
  update(@MessageBody() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @SubscribeMessage('removeUser')
  remove(@MessageBody() id: number) {
    return this.usersService.remove(id);
  }
}
