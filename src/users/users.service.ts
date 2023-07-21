import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  // Entityを作成した際にUsersModuleでリポジトリを定義したので
  // @InjectRepository()デコレータを使用してUsersRepositoryをUsersServiceにインジェクション
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async create({ username, password }: CreateUserDto) {
    //.create()を使えばEntityのインスタンスを作成する。.save()はDBに保存。いきなしsaveでも問題はない。
    const newUser = await this.usersRepository.save({
      //awaitなので、createでのpost送信が終わるのを待ってからreturnされる
      username: username,
      password: password,
    });
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('could not find user');
    }
    return user;
  }

  async updateOne(id: number, attrs: Partial<User>) {
    // Partial<User>はUserインターフェースの一部のプロパティだけを含むオブジェクト
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    //シャローコピー。userはターゲットであり、attrsはソースオブジェクト
    //attrs要素がuserにすでに存在する場合は上書きされ、存在しない場合は新たに追加
    return this.usersRepository.save(user);
  }

  async deleteOne(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.usersRepository.remove(user);
  }
}

//@InjectRepository デコレータを利用した上で、対象となるレポジトリを定義します。
//User へのアクセスを管理するためのレポジトリを TypeOrmModule が生成してくれます。
//型情報は、 TypeORM 本体の Repository の Generics でまかないます。
//userRepository はオーソドックスなレポジトリ層として利用可能になる
