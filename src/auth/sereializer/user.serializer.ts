import { Exclude, Expose } from 'class-transformer';

export class UserSignUpSerializer {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Exclude()
  password: string;
}
