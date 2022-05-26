import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { concatMap, delay, from, of } from 'rxjs';
import { Server } from 'ws';

const webSocketGateWayPort = 3300;
@WebSocketGateway(webSocketGateWayPort, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private readonly logger = new Logger(EventsGateway.name);
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage(client: any, payload: any) {
    this.logger.log('data from client', payload);

    const response = [1, 2, 3];

    return from(response).pipe(
      concatMap((data) => of({ event: 'events', data }).pipe(delay(1000))),
    );
  }
}
