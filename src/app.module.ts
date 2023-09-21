import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import config from '../config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppModule,
    CatsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    //app.moduleではroot:typeormとの接続の設定
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [User],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/* typeorm経由のmysqlとの接続どうなってんのか解説
1.ConfigModule.forRoot()で設定ファイルの内容をNestJS内に保存してる。(isglobal: trueで他のモジュールから利用できる)
2.TypeOrmModule.forRootAsync()でConfigModuleをimportsに指定することで、TypeORMがConfigServiceを利用できるようになります。
3.useFactoryオプションでは、実際のTypeORMの設定をConfigServiceから取得
4.TypeORMの設定はConfigService経由でConfigModuleで定義した設定ファイルの内容を利用する
これにより、TypeORMの設定を一元管理することができます。

ConfigServiceは、@nestjs/configモジュールが提供する便利な機能で、ConfigModuleで定義した設定を簡単に取得できる
configService.get('database.host')のようにして、設定ファイル内のdatabaseオブジェクトのhostプロパティの値を取得*/
