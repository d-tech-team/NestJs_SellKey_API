import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Images } from './images.model';
import { ImagesRepository } from './images.repository';

@Module({
  imports: [SequelizeModule.forFeature([Images])],
  providers: [ImagesService,ImagesRepository],
  controllers: [ImagesController],
  exports: [SequelizeModule,ImagesService]
})
export class ImagesModule { }
 