import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from '@/post/post.service';
import { CreatePostDto } from '@/post/dto/create-post.dto';
import { UpdatePostDto } from '@/post/dto/update-post.dto';
import { PostSerializer } from './serializer/post.serializer';

@Controller('post')
@SerializeOptions({ strategy: 'excludeAll', type: PostSerializer })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
