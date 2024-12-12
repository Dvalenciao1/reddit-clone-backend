import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserSignUpSerializer } from './sereializer/user.serializer';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async singUp(signUpDto: SignUpDto): Promise<UserSignUpSerializer> {
    const hashEncrypt = await this.encryptPassword(signUpDto.password);
    const signUp = await this.userService.create({ ...signUpDto, password: hashEncrypt });
    const data = plainToClass(UserSignUpSerializer, signUp, { excludeExtraneousValues: true });

    return data;
  }

  login(loginDto: LoginDto) {
    return "You're logged in as";
  }

  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<string> {
    const isMatch = await bcrypt.compare(password, hash);
    if (isMatch) return "You're logged";
  }

  /* async generateToken(user: any): Promise<{ accessToken: string }> {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  } */
}
