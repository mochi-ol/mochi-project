import { Controller, Get, Post, Body, ValidationPipe, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: CreateUserDto) {
    return this.usersService.updateOne(parseInt(id), updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }
}
