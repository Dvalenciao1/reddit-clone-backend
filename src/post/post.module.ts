import { Module } from '@nestjs/common';
import { PostService } from '@/post/post.service';
import { PostController } from '@/post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/post/entities/post.entity';
import { MinioModule } from '@/minio/minio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), MinioModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
