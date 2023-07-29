import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from './categories.model';

@Module({
  imports: [SequelizeModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
  exports: [SequelizeModule],
})
export class CategoriesModule {}
