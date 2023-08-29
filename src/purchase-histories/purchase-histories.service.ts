import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { BuyDto, CreatePurchaseHistoryDto } from './dto/create-purchase-history.dto';
import { UpdatePurchaseHistoryDto } from './dto/update-purchase-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PurchaseHistories } from './purchase-histories.model';
import { Features } from 'src/features/features.model';
import { Servers } from 'src/servers/servers.model';
import { Discount } from 'src/discount/discount.model';
import { System } from 'src/system/system.model';
import { Users } from 'src/users/users.model';
import { SystemService } from '../system/system.service';
import { UsersService } from '../users/users.service';
import * as moment from 'moment';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PurchaseHistoriesService {
     constructor(@InjectModel(PurchaseHistories) private purchaseHistoryModel: typeof PurchaseHistories,
          @InjectModel(Features) private featureModel: typeof Features,
          @InjectModel(Servers) private serverModel: typeof Servers,
          @InjectModel(Discount) private discountModel: typeof Discount,
          private systemService: SystemService,
          private userService: UsersService,
          private sequelize: Sequelize
     ) {

     }

     async findAll(user: any): Promise<any> {
          let purchase_histories = await this.purchaseHistoryModel.findAll({
               where: {
                    isDeleted: 0,
                    email: user.username
               }
          })

          const data = await Promise.all(purchase_histories.map(async (item) => {
               const feature = await this.featureModel.findOne({
                    where: {
                         id: item.feature,
                         isDeleted: 0,
                    },
               })

               const server = await this.serverModel.findOne({
                    where: {
                         id: item.server,
                         isDeleted: 0,
                    },
               })

               return {
                    ...item.dataValues,
                    feature: feature?.dataValues,
                    server: server?.dataValues
               }
          }))

          return {
               success: true,
               data
          }
     }

     async buy({ feature, server, expiry_date, ...data }: BuyDto, user: any): Promise<any> {

          try {
               const featureData = await this.featureModel.findOne({
                    where: {
                         id: feature,
                         isDeleted: 0,
                    },
               })

               if (!featureData) {
                    throw new NotFoundException('Tính năng không tồn tại')
               }

               const serverData = await this.serverModel.findOne({
                    where: {
                         id: server,
                         isDeleted: 0,
                    },
               })

               if (!serverData) {
                    throw new NotFoundException('Server không tồn tại')
               }

               const expiryDate = await this.discountModel.findOne({
                    where: {
                         id: expiry_date,
                         isDeleted: 0,
                    },
               })

               if (!expiryDate) {
                    throw new NotFoundException('Khuyến mãi không tồn tại')
               }

               let discount = expiryDate.percent || 0;

               if (user && user.role === 'agency') {
                    const system = await this.systemService.findAll()
                    discount = system.discountForAgency + discount || discount
               }


               const userData = await this.userService.findByUsername(user.username)

               const money = featureData.price * (100 - discount) / 100

               const cashOfUser = userData.cash || 0

               if (cashOfUser < money) {
                    throw new BadRequestException('Không đủ tiền')
               }

               await this.sequelize.transaction(async (t) => {
                    const transactionHost = { transaction: t };
                    await this.purchaseHistoryModel.create({
                         ...data,
                         email: userData.email,
                         feature,
                         server,
                         expiry_date: expiryDate.name,
                         code: 1,
                         expiry_time: moment().add(expiryDate.name, 'months').format('YYYY-MM-DD'),
                         money,
                         type: 'normal',

                    }, transactionHost)
               })

               await this.userService.update(userData.id, { cash: (cashOfUser - money) })


               return {
                    success: true,
                    data: 'Thanh toán thành công'
               }

          } catch (error) {
               throw new HttpException({
                    success: false,
                    data: error.message
               }, error?.statusCode || 500)
          }
     }

     async updateChartername(id: string, name: string, user: any) {
          try {

               const history = await this.purchaseHistoryModel.findOne({
                    where: {
                         id,
                         isDeleted: 0,
                         email: user.username
                    }
               })

               if (!history) {
                    throw new NotFoundException('Danh mục không tồn tại')
               }

               await this.userService.update(user.id, { name, code: 2 })

               return {
                    success: true,
                    data: 'Cập nhật thành công'
               }
          } catch (error) {
               throw new HttpException({
                    success: false,
                    data: error.message
               }, error?.statusCode || 500)
          }
     }
}
