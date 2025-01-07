import { Expose } from 'class-transformer';

export class CommentSerializer {
  @Expose()
  id: string;

  @Expose()
  content: string;
}
