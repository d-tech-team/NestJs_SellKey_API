import { BeforeCreate, Column, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";
import { v4 as uuidv4 } from 'uuid';

@Table({
    tableName: 'system'
})
export class System extends BaseModel {

    @Column
    apiAccessToken: string

    @Column
    apiAccessPhone: string

    @Column
    facebookPluginChatScript: string

    @Column
    discountForAgency: number

    @Column
    notication: string
}