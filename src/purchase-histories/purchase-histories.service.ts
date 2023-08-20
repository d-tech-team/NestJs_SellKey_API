import { Injectable } from '@nestjs/common';
import { CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PurchaseHistories } from './purchase-histories.model';

@Injectable()
export class PurchaseHistoriesService {
     constructor( @InjectModel(PurchaseHistories) private purchaseHistoryModel: typeof PurchaseHistories) {
       
     }
}
