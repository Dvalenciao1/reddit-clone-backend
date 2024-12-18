import { ApiProperty } from '@nestjs/swagger';
import { Interaction } from 'src/interaction/entities/interaction.entity';
import { Post } from 'src/post/entities/post.entity';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
