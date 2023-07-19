import { DataSource } from 'typeorm';
import { User } from './users/users.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'test',
  username: 'test',
  password: 'password',
  entities: [User],
  migrations: ['src/migration/*.ts'],

  // ログを出力するかどうか
  logging: true,

  // synchronize は開発時にのみ使用する
  // trueにすると、エンティティの変更を検知して、自動的にテーブルが更新される
  // 本番環境では、falseにすること
});
