import { Module } from '@nestjs/common';
import { RechargeHistoriesService } from './recharge_histories.service';
import { RechargeHistoriesController } from './recharge_histories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RechargeHistories } from './recharge_histories.model';

@Module({
  imports: [SequelizeModule.forFeature([RechargeHistories])],
  controllers: [RechargeHistoriesController],
  providers: [RechargeHistoriesService]
})
export class RechargeHistoriesModule {}
