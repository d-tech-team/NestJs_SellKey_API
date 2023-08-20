import { Module } from '@nestjs/common';
import { PurchaseHistoriesService } from './purchase-histories.service';
import { PurchaseHistoriesController } from './purchase-histories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchaseHistories } from './purchase-histories.model';

@Module({
  imports: [ SequelizeModule.forFeature([PurchaseHistories]) ],
  controllers: [PurchaseHistoriesController],
  providers: [PurchaseHistoriesService]
})
export class PurchaseHistoriesModule {}
