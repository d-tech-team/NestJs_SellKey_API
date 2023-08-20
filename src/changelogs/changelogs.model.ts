import { Column, Table } from "sequelize-typescript";
import { BaseModel } from "src/common/base/base.model";

@Table
export class ChangeLogs extends BaseModel {

    @Column
    name: string;

    @Column
    version: string;

    @Column
    content: string;
}