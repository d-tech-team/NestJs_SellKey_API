import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPost } from './dtos/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
 
  @Get()
  findAll() {
    return this.postService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.postService.findOne(id);
  }

  @Post() 
  @UseInterceptors(FileInterceptor('thumbnail'))
  create(@Body() body: createPost, @UploadedFile() file: Express.Multer.File) {
    return this.postService.create(body,file);
  }
}
