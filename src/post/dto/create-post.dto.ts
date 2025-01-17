import { UserDto } from '@/user/dto/user.dto';

import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  filename: string;

  @Type(() => UserDto)
  @IsNotEmpty()
  user: UserDto;
}
