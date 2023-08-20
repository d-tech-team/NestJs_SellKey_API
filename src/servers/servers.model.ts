import {Column, Model, Table } from "sequelize-typescript"
import { BaseModel } from "src/common/base/base.model"


@Table
export class Servers extends BaseModel {

    @Column
    name: string

    @Column
    code: string

    @Column
    location: string
}