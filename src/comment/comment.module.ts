import { Module } from '@nestjs/common';
import { CommentService } from '@/comment/comment.service';
import { CommentController } from '@/comment/comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
