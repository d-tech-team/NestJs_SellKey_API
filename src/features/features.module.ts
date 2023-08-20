import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Features } from './features.model';

@Module({
  imports: [SequelizeModule.forFeature([Features])],
  controllers: [FeaturesController],
  providers: [FeaturesService]
})
export class FeaturesModule { }
