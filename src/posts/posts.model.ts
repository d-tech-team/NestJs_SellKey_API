import {
  BeforeCreate,
  Column,
  HasOne,
  Table,
  Model,
} from 'sequelize-typescript';
import * as slug from 'slug';
import { Categories } from 'src/categories/categories.model';
import { Images } from 'src/images/images.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Posts extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  // @HasOne(() => Images, {
  //   foreignKey: 'id',
  // })
  thumbnail: string;

  @Column
  slug: string;

  @Column
  // @HasOne(() => Categories, {
  //   foreignKey: 'id',
  // })
  category: string;

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
  static createId(instance: Posts) {
    instance.id = uuidv4();
  }

  @BeforeCreate
  static createSlug(instance: Posts) {
    instance.slug = slug(instance.title);
  }
}
