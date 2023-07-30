import { Column, Table, Model, BeforeCreate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
const random = require('random-string-generator');

@Table
export class Users extends Model {

  @Column
  email: string;

  @Column
  password: string;

  @Column({
    defaultValue: 0,
  })
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

  @BeforeCreate
  static createToken(instance: Users) {
    instance.token = random(20)
  }
}
