import { Column, Table, Model } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  fullname: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  cash: number;

  @Column
  token: string;

  @Column({
    defaultValue: 'user',
  })
  role: string;

  @Column({
    defaultValue: 0,
  })
  isDeleted: number;

  @Column({
    defaultValue: Date.now(),
  })
  createdAt: Date;

  @Column({
    defaultValue: Date.now(),
  })
  updatedAt: Date;
}
