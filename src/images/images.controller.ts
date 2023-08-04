import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { multerOptions } from 'src/config/multer.config';

@Controller('images')
export class ImagesController {
    constructor(private readonly imageService: ImagesService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', multerOptions))
    create(@UploadedFile() file: Express.Multer.File) {
        return this.imageService.create(file)
    }
}
