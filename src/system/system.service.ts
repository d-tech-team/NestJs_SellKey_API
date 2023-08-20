import { HttpException, Injectable } from '@nestjs/common';
import { System } from './system.model';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { BaseService } from 'src/common/base/base.service';

@Injectable()
export class SystemService extends BaseService<System> {
  constructor(@InjectModel(System) private systemModel: typeof System, sequelize: Sequelize) {
    super(systemModel, sequelize);
  }

  async findAll(): Promise<any> {
    try {
      const system = await this.systemModel.findAndCountAll()

      return {
        success: true,
        data: system?.rows[0]?.dataValues || {}
      }

    } catch (error) {
      throw new HttpException({
        success: false,
        data: error.message
      }, error?.status || 500)
    }
  }


  async update(data: any): Promise<System | any> {
    try {
      const system = await this.systemModel.findAndCountAll()
      if (system.count == 0) {
        await this.sequelize.transaction(async (t) => {
          const transactionHost = { transaction: t };
          await this.systemModel.create(data, transactionHost)
        })
        return {
          success: true,
          data: 'Update successfully'
        }
      }

      await this.systemModel.update(data, {
        where: {
          id: system.rows[0].id
        }
      })
      return {
        success: true,
        data: 'Update successfully'
      }

    } catch (error) {
      throw new HttpException({
        success: false,
        data: error.message
      }, error?.status || 500)
    }
  }

}
