import { Module } from '@nestjs/common';
import { WebsocketsGateway } from '@/websockets/websockets.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [WebsocketsGateway],
})
export class WebsocketsModule {}
