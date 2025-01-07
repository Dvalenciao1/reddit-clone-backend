import { CreatePostDto } from '@/post/dto/create-post.dto';
import { UserDto } from '@/user/dto/user.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @Type(() => UserDto)
  user: UserDto;

  @IsNotEmpty()
  @Type(() => CreatePostDto)
  post: CreatePostDto;
}
