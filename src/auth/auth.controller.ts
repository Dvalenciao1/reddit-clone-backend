import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign')
  Signup(@Body() SignUpDto: SignUpDto) {
    const userSign = this.authService.singUp(SignUpDto);
    return userSign;
  }

  @Post('login')
  Login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
