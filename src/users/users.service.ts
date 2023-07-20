import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  users: CreateUserDto[] = [];
  async create({ username, password }: CreateUserDto) {
    await this.usersRepository.save({
      username: username,
      password: password,
    });
  }
  findAll() {
    return this.users;
  }
}

//@InjectRepository デコレータを利用した上で、対象となるレポジトリを定義します。
//User へのアクセスを管理するためのレポジトリを TypeOrmModule が生成してくれます。
//型情報は、 TypeORM 本体の Repository の Generics でまかないます。
//userRepository はオーソドックスなレポジトリ層として利用可能になる
