import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Images } from './images.model';

@Module({
  imports: [SequelizeModule.forFeature([Images])],
  providers: [ImagesService],
  controllers: [ImagesController],
  exports: [SequelizeModule]
})
export class ImagesModule { }
