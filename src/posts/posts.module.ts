import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './posts.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports : [SequelizeModule]
})
export class PostsModule {}
