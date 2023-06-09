/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Login')
  handleLogin(@Body() loginModel: LoginAuthDto) {
    return this.authService.Login(loginModel);
  }

  @Post('Register')
  handleRegister(@Body() registerModel: RegisterAuthDto) {
    return this.authService.Register(registerModel);
  }
}
