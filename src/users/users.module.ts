import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeOrm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //※
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], //exportsできるのはprovidersの中身のみ
})
export class UsersModule {}

//※
//TypeOrmModule は、forFeature によって、必要なエンティティの範囲だけを効率よく import できます。
//逆に言えば、これをしない限り TypeOrmModule を Service から利用できないので注意してください。
