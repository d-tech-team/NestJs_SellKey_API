import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { ImagesService } from 'src/images/images.service';
import { Images } from 'src/images/images.model';
import { CategoriesService } from 'src/categories/categories.service';
import { Categories } from 'src/categories/categories.model';

@Module({
  imports: [SequelizeModule.forFeature([Posts,Images,Categories])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, ImagesService,CategoriesService],
  exports: [SequelizeModule]
})
export class PostsModule { }
