import { Module } from '@nestjs/common';
import { PostService } from '@/post/post.service';
import { PostController } from '@/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
