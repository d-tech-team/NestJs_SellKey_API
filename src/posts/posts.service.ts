import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import * as slug from 'slug';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postModel: typeof Posts) {}

  findAll(): Promise<Posts[]> {
    return this.postModel.findAll({
      where: {
        isDeleted: 0,
      },
      order: [['id', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Posts> {
    const post = await this.postModel.findOne({
      where: {
        id,
        isDeleted: 0,
      },
    });
    if (!post) {
      throw new NotFoundException('Bài viết không tồn tại');
    }
    return post;
  }

  async create({ title, ...data }): Promise<Posts> {
    const newSlug = slug(title);
    const post = await this.postModel.findOne({
      where: {
        slug: newSlug,
        isDeleted: 0,
      },
    });

    if (post) {
      throw new BadRequestException('Danh mục đã tồn tại');
    }

    return post;
  }
}
