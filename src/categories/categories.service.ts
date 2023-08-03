import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as slug from 'slug';
import { Categories } from './categories.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoryModel: typeof Categories,
  ) {}

  async findAll(): Promise<Categories[]> {
    return this.categoryModel.findAll({
      where: {
        isDeleted: 0,
      },
      order: [['createdAt', 'DESC']],
    }); 
  }

  async findOne(id: number): Promise<Categories> {
    const category = await this.categoryModel.findOne({
      where: {
        id,
        isDeleted: 0,
      },
    });
    if (!category) {
      throw new NotFoundException('Danh mục không tìm thấy');
    }
    return category;
  }

  async create({ name }): Promise<Categories> {
    const newSlug = slug(name);
    const category = await this.categoryModel.findOne({
      where: {
        slug: newSlug,
        isDeleted: 0,
      },
    });

    if (category) {
      throw new BadRequestException('Danh mục đã tồn tại');
    }
    return this.categoryModel.create({ name });
  }

  async update(id, { name }): Promise<Categories | any> {
    let category = await this.categoryModel.findOne({
      where: {
        id,
        isDeleted: 0,
      },
    });
    if (!category) {
      throw new NotFoundException('Danh mục không tìm thấy');
    }
    const newSlug = slug(name);
    category = await this.categoryModel.findOne({
      where: {
        slug: newSlug,
        isDeleted: 0,
      },
    });

    if (category) {
      throw new BadRequestException('Danh mục đã tồn tại');
    }
    return this.categoryModel.update(
      { name, slug: newSlug },
      {
        where: {
          id,
        },
      },
    );
  }

  async delete(id: number): Promise<Categories | any> {
    const category = await this.categoryModel.findOne({
      where: {
        id,
        isDeleted: 0,
      },
    });
    if (!category) {
      throw new NotFoundException('Danh mục không tìm thấy');
    }
    return this.categoryModel.update(
      { isDeleted: 1 },
      {
        where: {
          id,
        },
      },
    );
  }
}
