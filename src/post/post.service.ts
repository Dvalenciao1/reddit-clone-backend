import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '@/post/dto/create-post.dto';
import { UpdatePostDto } from '@/post/dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@/post/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.save({ id, ...updatePostDto });
  }

  remove(id: number) {
    return this.postRepository.softDelete({ id });
  }
}
