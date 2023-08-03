import { Model, Column, Table, BeforeCreate } from 'sequelize-typescript';
import * as slug from 'slug';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Categories extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column
  name: string;

  @Column
  slug: string;

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
  static createId(instance: Categories) {
    instance.id = uuidv4();
  }

  @BeforeCreate
  static beforeCreateCategory(instance: Categories) {
    console.log(`Create category with id = ${instance.id} success`);
    instance.slug = slug(instance.name);
  }
}
