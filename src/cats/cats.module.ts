import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service'; 

@Module({
  controllers: [CatsController], // ②
  providers: [CatsService], // ①
  exports: [CatsService] // ④　これで、CatsModuleをインポートしたモジュールは全てCatsServiceにアクセスできるようになる
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}

// Module()デコレーターは、モジュールをプロパティで記述したオブジェクトを受け取る
// ①providers    ：Nestインジェクタによってインスタンス化され、少なくともこのModule全体で共有される可能性があるProvider。
// ②controllers  ：このModuleで定義された、インスタンス化する必要のあるControllerのセット。
// ③imports      ：このModuleで必要とされるProviderをエクスポートするインポートモジュールのリスト。
// ④exports      ：このモジュールが提供するProviderのサブセットで、このModuleをインポートしている他のModuleで利用可能であるべきものを指定するリスト。Provider自体。またはそのトークンだけを使える。


// NestJSにおけるModule層の存在意義は、単一の機能や機能グループをカプセル化し、関連するコンポーネントをグループ化すること！