import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'socket' })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('newPublication')
  handledNewPlubication(@MessageBody() publication: any) {
    console.log('publication received', publication);
  }

  @SubscribeMessage('newComment')
  handledNewComment(@MessageBody() comment: any, @ConnectedSocket() client: Socket) {
    this.server.emit('newComment', comment);
    console.log('comment received', comment);
  }
}
