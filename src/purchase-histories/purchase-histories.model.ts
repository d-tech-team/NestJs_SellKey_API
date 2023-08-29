import { Column, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";

@Table({
    tableName: 'purchase_histories'
})
export class PurchaseHistories extends BaseModel {
   
    @Column
    email: string

    @Column
    username  : string

    @Column
    name : string

    @Column
    server : string

    @Column
    code  : string

    @Column
    feature : string

    @Column
    expiry_date : string

    @Column 
    expiry_time : string

    @Column
    money : number

    @Column
    type : string

}