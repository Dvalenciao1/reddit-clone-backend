import { User } from '@/user/entities/user.entity';
import { Expose } from 'class-transformer';

export class UserSerializer {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
