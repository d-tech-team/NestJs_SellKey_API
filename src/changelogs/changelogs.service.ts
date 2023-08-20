import { Injectable } from '@nestjs/common';
import { CreateChangelogDto } from './dto/create-changelog.dto';
import { UpdateChangelogDto } from './dto/update-changelog.dto';
import { ChangeLogs } from './changelogs.model';
import { BaseService } from 'src/common/base/base.service';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ChangelogsService extends BaseService<ChangeLogs> {
  constructor(
    @InjectModel(ChangeLogs) private changelogsModel: typeof ChangeLogs,
     sequelize: Sequelize,
  ) {
    super(changelogsModel, sequelize);
  }
}
