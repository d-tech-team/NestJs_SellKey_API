import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import * as slug from 'slug';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postModel: typeof Posts,
    private sequelize: Sequelize
  ) { }

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

  async create({ title, ...data }, file: Express.Multer.File): Promise<Posts> {
    const newSlug = slug(title);
    try {
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };

        const post = await this.postModel.findOne({
          where: {
            slug: newSlug,
            isDeleted: 0,
          },
        });
        if (post) {
          throw new BadRequestException('Danh mục đã tồn tại');
        }

        if (!file) {
          throw new BadRequestException("Thumbnail không được để trống")
        }

        return post;
      });

    } catch (error) {

    }

  }
}
