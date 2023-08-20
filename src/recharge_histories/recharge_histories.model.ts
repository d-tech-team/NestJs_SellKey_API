import { Column, Model, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";


@Table({
    tableName: 'recharge_histories'
})
export class RechargeHistories extends BaseModel {

    @Column
    email: string

    @Column
    tradingCode: string

    @Column
    money: number

}