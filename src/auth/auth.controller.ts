import { Controller, Get, Post, Body, ValidationPipe, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.authService.login(createUser);
  }
}
