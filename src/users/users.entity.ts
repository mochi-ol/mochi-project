import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    comment: 'アカウントID',
  })
  id: number;

  @Column('varchar', { comment: 'アカウント名' })
  username: string;

  @Column('varchar', { comment: 'パスワード' })
  password: string;
}
