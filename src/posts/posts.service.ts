import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import * as slug from 'slug';
import { Sequelize } from 'sequelize-typescript';
import { createPost } from './dtos/create.dto';
import { ImagesService } from 'src/images/images.service';
import { CategoriesService } from 'src/categories/categories.service';
import { updatePost } from './dtos/update.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Posts) private postModel: typeof Posts,
    private sequelize: Sequelize,
    private readonly imageService: ImagesService,
    private readonly categoryService: CategoriesService
  ) { }

  async findAll(): Promise<Posts[] | any> {
    const posts = await this.postModel.findAll({
      where: {
        isDeleted: 0,
        id: 6
      },
      order: [['createdAt', 'DESC']],
    });

    return await Promise.all(posts && posts.map(async item => {
      const thumbnail = await this.imageService.findOne(item.thumbnail)
      const category = await this.categoryService.findOne(item.category)

      return {
        ...item?.dataValues,
        thumbnail,
        category
      }
    }))
  }

  async findOne(id: string): Promise<Posts | any> {
    const post = await this.postModel.findOne({
      where: {
        id,
        isDeleted: 0,
      },
    });

    if (!post) {
      throw new NotFoundException('Bài viết không tồn tại');
    }
    const thumbnail = await this.imageService.findOne(post.thumbnail)
    const category = await this.categoryService.findOne(post.category)
    return {
      ...post?.dataValues,
      thumbnail,
      category
    };
  }

  async create({ title, thumbnail, category, ...data }: createPost): Promise<Posts> {
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
    const cate = await this.categoryService.findOne(category)
    if (!cate) {
      throw new BadRequestException("Danh mục không được tìm thấy")
    }
    const thumb = await this.imageService.findOne(thumbnail)
    if (!thumb) {
      throw new BadRequestException("Thumbnail không tìm thấy")
    }

    try {
      return await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
        const { content } = data
        return this.postModel.create({
          title,
          content,
          thumbnail,
          category
        }, transactionHost)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, { category, thumbnail, ...data } : updatePost): Promise<Posts | any> {

    console.log(id);
    
    const post = await this.findOne(id)
    if (!post) {
      throw new BadRequestException("Bài viết không được tìm thấy")
    }
    const cate = await this.categoryService.findOne(category)
    if (!cate) {
      throw new BadRequestException("Danh mục không được tìm thấy")
    }

    const thumb = await this.imageService.findOne(thumbnail)
    if (!thumb) {
      throw new BadRequestException("Thumbnail không tìm thấy")
    }
    const { title, content } = data

    if (thumbnail && thumbnail !== post.thumbnail) {
      await this.imageService.delete(post.thumbnail)
      return this.postModel.update({
        title, content, thumbnail
      }, {
        where: {
          id
        }
      })
    }
    return this.postModel.update({
      title, content
    }, {
      where: {
        id
      }
    })
  }
}
