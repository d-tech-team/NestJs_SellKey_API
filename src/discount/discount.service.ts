import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './discount.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class DiscountService extends BaseService<Discount> {
    constructor(
       @InjectModel(Discount) private readonly discountModel: typeof Discount  ,
       sequelize : Sequelize
    ){
        super(discountModel,sequelize);
    }
   
}
