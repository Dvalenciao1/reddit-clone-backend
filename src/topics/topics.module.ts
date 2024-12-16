import { Module } from '@nestjs/common';
import { TopicsService } from '@/topics/topics.service';
import { TopicsController } from '@/topics/topics.controller';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
