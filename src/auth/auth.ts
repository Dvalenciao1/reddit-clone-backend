import * as bcrypt from 'bcrypt';

export class hashing {
  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    let isCorrecPassword = false;
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) return (isCorrecPassword = true);
    return isCorrecPassword;
  }
}
