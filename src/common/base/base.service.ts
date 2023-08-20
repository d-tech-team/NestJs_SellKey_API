import { Model, ModelCtor, Sequelize } from "sequelize-typescript";
import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class BaseService<T extends Model<T | any>> {
    constructor(
        protected model: ModelCtor<T | any>,
        protected sequelize: Sequelize,
    ) { }

    async findAll(): Promise<T[] | any> {
        try {
            const data = await this.model.findAll({
                where: {
                    isDeleted: 0,
                },
                order: [['createdAt', 'DESC']],
            })
            return {
                success: true,
                data
            }
        } catch (error) {
            throw new HttpException({
                success: false,
                data: error.message
            }, error?.statusCode || 500)
        }
    }

    async findOne(id: string): Promise<T | any> {
        try {
            const item = await this.model.findOne({
                where: {
                    id,
                    isDeleted: 0,
                },
            })
            if (!item) {
                throw new NotFoundException('Danh mục không tồn tại')
            }
            return {
                success: true,
                data: item
            }
        } catch (error) {
            throw new HttpException({
                success: false,
                data: error.message
            }, error?.status || 500)
        }
    }

    async create(data: any): Promise<T | any> {

        try {

            const item = await this.sequelize.transaction(async (t) => {
                const transactionHost = { transaction: t };
                const item = await this.model.create(data, transactionHost)
                return item
            })
            return {
                success: true,
                data: item
            }
        } catch (error) {
            console.log(error);

            throw new HttpException({
                success: false,
                data: error.message
            }, error?.status || 500)
        }
    }

    async update(id: string, data: any): Promise<T | any> {

        try {
            const item = await this.model.findOne({
                where: {
                    id,
                    isDeleted: 0,
                },
            })
            if (!item) {
                throw new NotFoundException('Danh mục không tồn tại')
            }
            await this.model.update(data, { where: { id } })
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

    async delete(id: string): Promise<T | any> {
        try {
            const item = await this.model.findOne({
                where: {
                    id,
                    isDeleted: 0,
                },
            })
            if (!item) {
                throw new NotFoundException('Danh mục không tồn tại')
            }
            await this.model.update({ isDeleted: 1 }, { where: { id } })
            return {
                success: true,
                data: 'Delete successfully'
            }
        } catch (error) {
            throw new HttpException({
                success: false,
                data: error.message
            }, error?.status || 500)
        }
    }
}