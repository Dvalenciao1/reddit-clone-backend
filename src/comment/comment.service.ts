import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from '@/comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@/comment/dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {}
  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  findAll() {
    try {
      return this.commentRepository.find({ loadRelationIds: true });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
