import { Injectable } from '@nestjs/common';
import { CreateRechargeHistoryDto } from './dto/create-recharge_history.dto';
import { UpdateRechargeHistoryDto } from './dto/update-recharge_history.dto';
import { BaseService } from 'src/common/base/base.service';
import { RechargeHistories } from './recharge_histories.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class RechargeHistoriesService extends BaseService<RechargeHistories> {
  constructor(
    @InjectModel(RechargeHistories) private rechargeHistoriesModel: typeof RechargeHistories,
    sequelize: Sequelize
  ) {
    super(rechargeHistoriesModel, sequelize);
  }
}
