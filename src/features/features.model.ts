import { Column, Model, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";


@Table
export class Features extends BaseModel {
    @Column
    name: string

    @Column
    price: number

    @Column
    type: string

    @Column
    notice: string

    @Column
    noti_enabled: boolean

}
