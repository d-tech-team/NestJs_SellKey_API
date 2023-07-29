import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDTO } from './categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() body: CategoriesDTO) {
    return this.categoriesService.create({ name: body.name });
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: CategoriesDTO) {
    return this.categoriesService.update(id, { name: body.name });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
