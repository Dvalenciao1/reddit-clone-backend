import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@/post/dto/create-post.dto';
import { UpdatePostDto } from '@/post/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@/post/entities/post.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { MinioService } from '@/minio/minio.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private minioService: MinioService,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  async findAllPost() {
    const posts = await this.postRepository.find({
      relations: { user: true },
      loadRelationIds: { relations: ['user'] },
      order: { createdAt: 'DESC' },
      take: 10,
      cache: true,
    });

    const postWithUrl = await this.minioService.getUrlPostsImages(posts);

    return postWithUrl;
  }

  async findAllImage() {
    const posts = await this.postRepository.find({
      where: { filename: Not(IsNull()) },
      relations: { user: true },
      loadRelationIds: { relations: ['user'] },
      order: { createdAt: 'DESC' },
      take: 5,
      cache: true,
    });

    const postWithImage = await this.minioService.getUrlPostsImages(posts);

    return postWithImage;
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: { user: true },
      loadRelationIds: { relations: ['user'] },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.save({ id, ...updatePostDto });
  }

  remove(id: number) {
    return this.postRepository.softDelete({ id });
  }
}
