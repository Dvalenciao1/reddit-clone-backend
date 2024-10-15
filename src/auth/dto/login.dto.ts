import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './signup.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
