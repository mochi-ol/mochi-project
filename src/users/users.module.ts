import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeOrm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], //exportsできるのはprovidersの中身のみ
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
