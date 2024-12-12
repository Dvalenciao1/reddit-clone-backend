import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SignUpDto } from './signup.dto';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto extends PartialType(SignUpDto) {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;
}
