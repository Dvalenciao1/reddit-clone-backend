import { UserDto } from '@/user/dto/user.dto';

import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => UserDto)
  @IsNotEmpty()
  user: UserDto;
}
