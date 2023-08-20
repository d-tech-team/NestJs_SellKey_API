import { BeforeCreate, Column, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";
import { v4 as uuidv4 } from 'uuid';

@Table({
    tableName: 'system'
})
export class System extends BaseModel {

    @Column({
        primaryKey: true,
    })
    id: string;

    @Column
    apiAccessToken: string

    @Column
    apiAccessPhone: string

    @Column
    facebookPluginChatScript: string

    @Column
    notication: string

    @Column({
        defaultValue: Date.now(),
    })
    createdAt: Date;

    @Column({
        defaultValue: Date.now(),
    })
    updatedAt: Date;

    @BeforeCreate
    static createId(instance: BaseModel) {
        instance.id = uuidv4();
    }
}