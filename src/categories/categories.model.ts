import {
  Model,
  Column,
  Table,
  BeforeCreate,
  BeforeUpdate,
  BeforeSave,
} from 'sequelize-typescript';
import * as slug from 'slug';

@Table
export class Categories extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
  static beforeCreateCategory(instance: Categories) {
    console.log(`Create category with id = ${instance.id} success`);
    instance.slug = slug(instance.name);
  }

  @BeforeUpdate
  static beforeUpdateCategory(instance: Categories) {
    console.log(`Update category with id = ${instance.id} success`);
    instance.slug = slug(instance.name);
  }
}
