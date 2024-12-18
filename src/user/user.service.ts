import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TypeORMExceptions } from 'src/common/errors/ORM/TypeOrmErrors';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.save(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof TypeORMExceptions || error.name === 'QueryFailedError')
        throw new TypeORMExceptions(error.driverError, { status: error.errno, code: error.sqlState });
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.softDelete({ id });
  }
}
