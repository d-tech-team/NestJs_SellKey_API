import { Module } from '@nestjs/common';
import { PurchaseHistoriesService } from './purchase-histories.service';
import { PurchaseHistoriesController } from './purchase-histories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PurchaseHistories } from './purchase-histories.model';
import { ServersRepository } from 'src/servers/servers.repository';
import { FeaturesRepository } from 'src/features/features.repository';
import { Servers } from 'src/servers/servers.model';
import { Features } from 'src/features/features.model';
import { Discount } from 'src/discount/discount.model';
import { System } from 'src/system/system.model';
import { SystemService } from 'src/system/system.service';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([PurchaseHistories, Servers, Features, Discount, System,Users])],
  controllers: [PurchaseHistoriesController],
  providers: [PurchaseHistoriesService, SystemService, UsersService]
})
export class PurchaseHistoriesModule { }
