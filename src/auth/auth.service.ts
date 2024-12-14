import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { UserLoginSerializer, UserSignUpSerializer } from './sereializer/user.serializer';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { TypeORMExceptions } from 'src/common/errors/ORM/TypeOrmErrors';
import { hashing } from './auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hash: hashing,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(signUpDto: SignUpDto): Promise<UserSignUpSerializer> {
    const hashEncrypt = await this.hash.encryptPassword(signUpDto.password);
    const signUp = await this.userService.create({ ...signUpDto, password: hashEncrypt });
    const data = this.serializeUserData(signUp, UserSignUpSerializer);
    return data;
  }

  async login(loginDto: LoginDto): Promise<{ data: UserLoginSerializer; accessToken: string }> {
    const userMatch = await this.userService.findOne(loginDto);

    if (!userMatch) throw new NotFoundException('User not found');

    const isPassword = await this.hash.comparePassword(loginDto.password, userMatch.password);
    if (!isPassword) throw new UnauthorizedException('Password incorrect');

    const userData = this.serializeUserData(userMatch, UserLoginSerializer);

    const token = await this.generateToken(userData);
    return { data: userData, ...token };
  }

  serializeUserData<T>(data: any, classSerializer: ClassConstructor<T>): T {
    return plainToClass(classSerializer, data, { excludeExtraneousValues: true });
  }

  async generateToken(user: UserLoginSerializer): Promise<{ accessToken: string }> {
    const payload = { username: user.username, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
