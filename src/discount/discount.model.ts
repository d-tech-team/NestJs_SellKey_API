import { Column, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";


@Table({
    tableName: 'discount'
})
export class Discount extends BaseModel {

    @Column
    name: number

    @Column
    percent: number
}