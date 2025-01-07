import { Expose, Type } from 'class-transformer';
import { UserSerializer } from './user.serializer';
import { CommentSerializer } from './comment.serializer';

export class PostSerializer {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Type(() => UserSerializer)
  @Expose()
  user: UserSerializer;

  @Type(() => CommentSerializer)
  @Expose()
  comments: CommentSerializer[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
