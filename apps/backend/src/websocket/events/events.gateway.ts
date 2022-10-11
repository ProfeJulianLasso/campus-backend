import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('afterInit', server);
    // throw new Error('Method not implemented.');
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log('handleConnection', client.id);
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: Socket) {
    console.log('handleDisconnect', client.id);
    // throw new Error('Method not implemented.');
  }

  @SubscribeMessage('events1')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  @SubscribeMessage('StudentCreated')
  handleEvent2(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log('client', client);
    this.server.emit('StudentCreated', data);
    console.log(data);
  }

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('testeo')
  // test0(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
  //   console.log('client', client);
  //   console.log('test0', data);
  //   // this.server.emit('StudentCreated', 'aqui todo bien!!!!');
  //   return 'hola mi test0';
  // }

  // @SubscribeMessage('mytest')
  // test1(@MessageBody() data: any) {
  //   console.log('test1', data);
  //   return 'hola mi test1';
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: string): Promise<string> {
  //   console.log('identity', data);
  //   return data.replace('navegador', 'servidor');
  // }

  // @SubscribeMessage('StudentCreated')
  // async studentCreated(@MessageBody() data: any): Promise<any> {
  //   console.log('StudentCreated - Backend:', data);
  //   return data;
  // }
}
