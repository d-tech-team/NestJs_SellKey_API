import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { BaseService } from 'src/common/base/base.service';
import { Features } from './features.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class FeaturesService extends BaseService<Features> {
  constructor(@InjectModel(Features) private readonly featuresModel: typeof Features,
    sequelize: Sequelize
  ) {
    super(featuresModel, sequelize);
  }
}
