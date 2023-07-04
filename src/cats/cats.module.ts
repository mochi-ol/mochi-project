import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service'; // ③

@Module({
  controllers: [CatsController], // ②
  providers: [CatsService], // ①
})
export class CatsModule {} // ④

// NestJSにおけるModuleは以下の４つの要素で構成される
// ①providers    ：Nestインジェクタによってインスタンス化され、少なくともこのModule全体で共有される可能性があるProvider。
// ②controllers  ：このModuleで定義された、インスタンス化する必要のあるControllerのセット。
// ③imports      ：このModuleで必要とされるProviderをエクスポートするインポートモジュールのリスト。
// ④exports      ：このモジュールが提供するProviderのサブセットで、このModuleをインポートしている他のModuleで利用可能であるべきものを指定するリスト。Provider自体。またはそのトークンだけを使える。